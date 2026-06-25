import { Link2, Fish, KeyRound, Hash, type LucideIcon } from "lucide-react";

export interface ToolMeta {
  slug: string;
  href: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  color: string; // hex accent
  features: string[];
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "url-scanner",
    href: "/tools/url-scanner",
    title: "URL Scanner",
    short: "Analyze any URL for risk",
    description:
      "Inspect URL structure, detect suspicious keywords, shortened links and risky domains with a 0–100 security score.",
    icon: Link2,
    color: "#00F5D4",
    features: [
      "Structure analysis",
      "Suspicious keywords",
      "Shortener detection",
      "Risk score 0–100",
    ],
  },
  {
    slug: "phishing-detector",
    href: "/tools/phishing-detector",
    title: "AI Phishing Detector",
    short: "Catch phishing & typosquats",
    description:
      "An AI-style engine that flags fake domains, typosquatting, suspicious subdomains and credential-harvesting patterns.",
    icon: Fish,
    color: "#00B4D8",
    features: [
      "Typosquatting detection",
      "Fake domain analysis",
      "Confidence scoring",
      "Security recommendations",
    ],
  },
  {
    slug: "password-checker",
    href: "/tools/password-checker",
    title: "Password Strength",
    short: "Real-time strength meter",
    description:
      "Real-time entropy analysis with an animated strength meter and improvement tips. Passwords never leave your device.",
    icon: KeyRound,
    color: "#7B2CBF",
    features: [
      "Live entropy scoring",
      "Animated strength meter",
      "Crack-time estimate",
      "Never stored",
    ],
  },
  {
    slug: "hash-generator",
    href: "/tools/hash-generator",
    title: "Hash Generator",
    short: "MD5, SHA-1/256/512",
    description:
      "Instantly generate MD5, SHA-1, SHA-256 and SHA-512 hashes with one-click copy. Fully client-side.",
    icon: Hash,
    color: "#06D6A0",
    features: ["MD5 & SHA family", "Instant generation", "One-click copy", "Mobile ready"],
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
