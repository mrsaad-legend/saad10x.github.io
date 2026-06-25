/**
 * AI-style Phishing URL Detector.
 * A weighted, explainable scoring model that mimics how an ML classifier
 * reasons about phishing signals — fully client-side and deterministic.
 */

export type PhishingVerdict = "Legitimate" | "Potential Phishing" | "High Risk";

export interface PhishingReason {
  id: string;
  text: string;
  impact: number; // contribution to phishing probability (0..1 scale points)
  type: "negative" | "positive";
}

export interface PhishingResult {
  inputUrl: string;
  hostname: string;
  verdict: PhishingVerdict;
  /** 0..100 confidence that the URL is phishing */
  confidence: number;
  reasons: PhishingReason[];
  recommendations: string[];
}

const POPULAR_BRANDS = [
  "google",
  "facebook",
  "instagram",
  "apple",
  "microsoft",
  "amazon",
  "paypal",
  "netflix",
  "linkedin",
  "whatsapp",
  "binance",
  "coinbase",
  "outlook",
  "office365",
  "dropbox",
  "github",
  "steam",
  "bankofamerica",
  "wellsfargo",
  "chase",
];

const CREDENTIAL_TERMS = [
  "login",
  "signin",
  "verify",
  "account",
  "secure",
  "update",
  "confirm",
  "password",
  "credential",
  "auth",
  "recover",
  "unlock",
];

const IPV4_RE =
  /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;

function normalize(raw: string): string {
  const trimmed = raw.trim();
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)) return `http://${trimmed}`;
  return trimmed;
}

/** Levenshtein distance for typosquatting detection. */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

export function detectPhishing(rawUrl: string): PhishingResult | null {
  if (!rawUrl || !rawUrl.trim()) return null;

  const normalized = normalize(rawUrl);
  let url: URL;
  try {
    url = new URL(normalized);
  } catch {
    return {
      inputUrl: rawUrl,
      hostname: "",
      verdict: "High Risk",
      confidence: 80,
      reasons: [
        {
          id: "malformed",
          text: "The URL is malformed and cannot be parsed safely.",
          impact: 0.8,
          type: "negative",
        },
      ],
      recommendations: [
        "Do not open this link.",
        "Verify the source through an official channel.",
      ],
    };
  }

  const hostname = url.hostname.toLowerCase();
  const labels = hostname.split(".");
  const domainCore = labels.length >= 2 ? labels[labels.length - 2] : hostname;
  const path = (url.pathname + url.search).toLowerCase();
  const reasons: PhishingReason[] = [];

  let probability = 0.12; // base rate

  // IP-based URL
  if (IPV4_RE.test(hostname)) {
    probability += 0.32;
    reasons.push({
      id: "ip",
      text: "Uses a raw IP address instead of a domain name.",
      impact: 0.32,
      type: "negative",
    });
  }

  // No HTTPS
  if (url.protocol === "http:") {
    probability += 0.1;
    reasons.push({
      id: "http",
      text: "Connection is not encrypted (HTTP instead of HTTPS).",
      impact: 0.1,
      type: "negative",
    });
  } else {
    probability -= 0.04;
    reasons.push({
      id: "https",
      text: "Uses HTTPS encryption.",
      impact: 0.04,
      type: "positive",
    });
  }

  // Brand impersonation in subdomain/path but not the registrable domain
  const brandInHostNotDomain = POPULAR_BRANDS.find(
    (b) => hostname.includes(b) && domainCore !== b && !domainCore.startsWith(b)
  );
  if (brandInHostNotDomain) {
    probability += 0.28;
    reasons.push({
      id: "brand-misuse",
      text: `Mentions the brand "${brandInHostNotDomain}" outside the real domain — common impersonation tactic.`,
      impact: 0.28,
      type: "negative",
    });
  }

  // Typosquatting: domain core is 1-2 edits away from a known brand
  let typoMatch: { brand: string; dist: number } | null = null;
  for (const brand of POPULAR_BRANDS) {
    const dist = levenshtein(domainCore, brand);
    if (dist > 0 && dist <= 2 && Math.abs(domainCore.length - brand.length) <= 2) {
      if (!typoMatch || dist < typoMatch.dist) typoMatch = { brand, dist };
    }
  }
  if (typoMatch) {
    probability += 0.34;
    reasons.push({
      id: "typosquat",
      text: `Domain "${domainCore}" closely resembles "${typoMatch.brand}" (typosquatting).`,
      impact: 0.34,
      type: "negative",
    });
  }

  // Suspicious subdomains depth
  const subdomainCount = Math.max(labels.length - 2, 0);
  if (subdomainCount >= 3) {
    probability += 0.16;
    reasons.push({
      id: "subdomains",
      text: `Has ${subdomainCount} subdomain levels, often used to mask the real host.`,
      impact: 0.16,
      type: "negative",
    });
  }

  // Credential harvesting indicators
  const credTerms = CREDENTIAL_TERMS.filter(
    (t) => hostname.includes(t) || path.includes(t)
  );
  if (credTerms.length > 0) {
    const impact = Math.min(0.08 + credTerms.length * 0.05, 0.24);
    probability += impact;
    reasons.push({
      id: "credentials",
      text: `Contains credential-related terms (${credTerms
        .slice(0, 5)
        .join(", ")}).`,
      impact,
      type: "negative",
    });
  }

  // "@" trick
  if (normalized.includes("@")) {
    probability += 0.2;
    reasons.push({
      id: "at",
      text: "Contains an '@' symbol that can redirect to a hidden host.",
      impact: 0.2,
      type: "negative",
    });
  }

  // Punycode
  if (hostname.includes("xn--")) {
    probability += 0.22;
    reasons.push({
      id: "punycode",
      text: "Uses punycode encoding that can spoof legitimate domains.",
      impact: 0.22,
      type: "negative",
    });
  }

  // Digits in domain core
  const digitCount = (domainCore.match(/\d/g) || []).length;
  if (digitCount >= 2) {
    probability += 0.08;
    reasons.push({
      id: "digits",
      text: "Domain name contains several digits, atypical for established brands.",
      impact: 0.08,
      type: "negative",
    });
  }

  // Clamp probability to (0,1)
  probability = Math.max(0.02, Math.min(0.98, probability));
  const confidence = Math.round(probability * 100);

  let verdict: PhishingVerdict;
  if (confidence < 35) verdict = "Legitimate";
  else if (confidence < 65) verdict = "Potential Phishing";
  else verdict = "High Risk";

  const recommendations =
    verdict === "Legitimate"
      ? [
          "No strong phishing signals found, but stay vigilant.",
          "Always confirm the domain spelling before logging in.",
          "Enable multi-factor authentication on important accounts.",
        ]
      : verdict === "Potential Phishing"
      ? [
          "Do not enter credentials until you verify the domain.",
          "Hover over links and inspect the real destination.",
          "Navigate to the official site by typing the address manually.",
        ]
      : [
          "Do NOT click, log in, or submit any information.",
          "Report the link to your security team or email provider.",
          "Delete the message containing this link.",
        ];

  return {
    inputUrl: rawUrl,
    hostname,
    verdict,
    confidence,
    reasons: reasons.sort((a, b) => b.impact - a.impact),
    recommendations,
  };
}
