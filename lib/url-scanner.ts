/**
 * URL Scanner engine.
 * Heuristic, fully client-side analysis of a URL's structure and reputation
 * signals. No network requests, no tracking.
 */

export type RiskVerdict = "Safe" | "Suspicious" | "Malicious";

export interface ScanFinding {
  id: string;
  label: string;
  detail: string;
  severity: "info" | "warning" | "critical";
  weight: number;
}

export interface UrlScanResult {
  inputUrl: string;
  normalizedUrl: string;
  hostname: string;
  verdict: RiskVerdict;
  /** 0 (dangerous) .. 100 (safe) security score */
  score: number;
  findings: ScanFinding[];
  summary: string;
}

const SUSPICIOUS_KEYWORDS = [
  "login",
  "verify",
  "secure",
  "account",
  "update",
  "confirm",
  "banking",
  "password",
  "signin",
  "webscr",
  "ebayisapi",
  "wallet",
  "bonus",
  "free",
  "gift",
  "unlock",
  "suspended",
  "limited",
];

const SHORTENERS = [
  "bit.ly",
  "tinyurl.com",
  "goo.gl",
  "t.co",
  "ow.ly",
  "is.gd",
  "buff.ly",
  "adf.ly",
  "cutt.ly",
  "rebrand.ly",
  "shorturl.at",
  "rb.gy",
  "tiny.cc",
];

const RISKY_TLDS = [
  ".zip",
  ".mov",
  ".xyz",
  ".top",
  ".gq",
  ".tk",
  ".ml",
  ".cf",
  ".ga",
  ".work",
  ".click",
  ".country",
  ".kim",
  ".loan",
  ".men",
  ".rest",
];

const IPV4_RE =
  /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;

function normalize(raw: string): string {
  const trimmed = raw.trim();
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)) {
    return `http://${trimmed}`;
  }
  return trimmed;
}

export function scanUrl(rawUrl: string): UrlScanResult | null {
  if (!rawUrl || !rawUrl.trim()) return null;

  const normalizedUrl = normalize(rawUrl);
  let url: URL;
  try {
    url = new URL(normalizedUrl);
  } catch {
    return {
      inputUrl: rawUrl,
      normalizedUrl,
      hostname: "",
      verdict: "Suspicious",
      score: 35,
      summary: "The URL could not be parsed. Malformed URLs can be a sign of obfuscation.",
      findings: [
        {
          id: "parse-error",
          label: "Invalid URL format",
          detail: "The provided string is not a valid, parseable URL.",
          severity: "warning",
          weight: 25,
        },
      ],
    };
  }

  const hostname = url.hostname.toLowerCase();
  const fullLower = normalizedUrl.toLowerCase();
  const findings: ScanFinding[] = [];

  // Protocol
  if (url.protocol === "http:") {
    findings.push({
      id: "no-https",
      label: "No HTTPS encryption",
      detail: "The site uses plain HTTP. Data sent to it is not encrypted in transit.",
      severity: "warning",
      weight: 15,
    });
  } else {
    findings.push({
      id: "https",
      label: "HTTPS enabled",
      detail: "Traffic to this host is encrypted via TLS.",
      severity: "info",
      weight: 0,
    });
  }

  // IP-based host
  if (IPV4_RE.test(hostname)) {
    findings.push({
      id: "ip-host",
      label: "IP address used as host",
      detail: "Legitimate brands rarely expose raw IP addresses to users.",
      severity: "critical",
      weight: 30,
    });
  }

  // Shorteners
  if (SHORTENERS.some((s) => hostname === s || hostname.endsWith(`.${s}`))) {
    findings.push({
      id: "shortener",
      label: "Shortened URL detected",
      detail: "Link shorteners hide the true destination of a link.",
      severity: "warning",
      weight: 18,
    });
  }

  // Suspicious keywords
  const matchedKeywords = SUSPICIOUS_KEYWORDS.filter((k) =>
    fullLower.includes(k)
  );
  if (matchedKeywords.length > 0) {
    findings.push({
      id: "keywords",
      label: `Suspicious keywords (${matchedKeywords.length})`,
      detail: `Found: ${matchedKeywords.slice(0, 6).join(", ")}. Common in phishing lures.`,
      severity: matchedKeywords.length >= 3 ? "critical" : "warning",
      weight: Math.min(10 + matchedKeywords.length * 6, 28),
    });
  }

  // Subdomain depth
  const labels = hostname.split(".");
  const subdomainCount = Math.max(labels.length - 2, 0);
  if (subdomainCount >= 3) {
    findings.push({
      id: "deep-subdomain",
      label: "Excessive subdomains",
      detail: `${subdomainCount} subdomain levels can be used to disguise the real domain.`,
      severity: "warning",
      weight: 14,
    });
  }

  // Risky TLD
  const matchedTld = RISKY_TLDS.find((t) => hostname.endsWith(t));
  if (matchedTld) {
    findings.push({
      id: "risky-tld",
      label: `High-risk TLD (${matchedTld})`,
      detail: "This top-level domain is frequently abused for malicious sites.",
      severity: "warning",
      weight: 16,
    });
  }

  // "@" in URL (credential confusion)
  if (normalizedUrl.includes("@")) {
    findings.push({
      id: "at-symbol",
      label: "'@' symbol in URL",
      detail: "Everything before '@' is ignored by browsers — a classic redirect trick.",
      severity: "critical",
      weight: 22,
    });
  }

  // Punycode / homograph
  if (hostname.includes("xn--")) {
    findings.push({
      id: "punycode",
      label: "Punycode domain",
      detail: "Internationalized domain that may impersonate a known brand (homograph attack).",
      severity: "critical",
      weight: 24,
    });
  }

  // Excessive hyphens / digits in host
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 3) {
    findings.push({
      id: "many-hyphens",
      label: "Many hyphens in domain",
      detail: "Heavily hyphenated domains often mimic real brand names.",
      severity: "warning",
      weight: 10,
    });
  }

  // Very long URL
  if (normalizedUrl.length > 90) {
    findings.push({
      id: "long-url",
      label: "Unusually long URL",
      detail: "Long URLs can hide redirects and obfuscated payloads.",
      severity: "info",
      weight: 6,
    });
  }

  const totalWeight = findings.reduce((acc, f) => acc + f.weight, 0);
  const score = Math.max(0, Math.min(100, 100 - totalWeight));

  let verdict: RiskVerdict;
  if (score >= 75) verdict = "Safe";
  else if (score >= 45) verdict = "Suspicious";
  else verdict = "Malicious";

  const summary =
    verdict === "Safe"
      ? "No major risk indicators detected. Always remain cautious with sensitive data."
      : verdict === "Suspicious"
      ? "Several warning signs detected. Avoid entering credentials until verified."
      : "Multiple high-risk indicators detected. Do not visit or enter any information.";

  return {
    inputUrl: rawUrl,
    normalizedUrl,
    hostname,
    verdict,
    score,
    findings: findings.sort((a, b) => b.weight - a.weight),
    summary,
  };
}
