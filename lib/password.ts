/**
 * Password Strength analyzer.
 * Computes entropy and a 0..100 score with actionable suggestions.
 * Passwords are analyzed in-memory only and never stored or transmitted.
 */

export type StrengthLabel = "Weak" | "Medium" | "Strong" | "Very Strong";

export interface PasswordChecks {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  noCommonPattern: boolean;
}

export interface PasswordResult {
  score: number; // 0..100
  label: StrengthLabel;
  entropyBits: number;
  checks: PasswordChecks;
  suggestions: string[];
  crackTime: string;
}

const COMMON_PASSWORDS = [
  "password",
  "123456",
  "123456789",
  "qwerty",
  "abc123",
  "111111",
  "letmein",
  "admin",
  "welcome",
  "iloveyou",
  "monkey",
  "dragon",
  "football",
  "12345678",
  "password1",
  "qwerty123",
];

const SEQUENTIAL = [
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
];

function hasCommonPattern(pw: string): boolean {
  const lower = pw.toLowerCase();
  if (COMMON_PASSWORDS.some((c) => lower.includes(c))) return true;
  // repeated characters e.g. aaaa, 1111
  if (/(.)\1{2,}/.test(pw)) return true;
  // sequential runs of length >= 4
  for (const seq of SEQUENTIAL) {
    for (let i = 0; i <= seq.length - 4; i++) {
      const chunk = seq.slice(i, i + 4);
      if (lower.includes(chunk) || lower.includes([...chunk].reverse().join("")))
        return true;
    }
  }
  return false;
}

function charsetSize(pw: string): number {
  let size = 0;
  if (/[a-z]/.test(pw)) size += 26;
  if (/[A-Z]/.test(pw)) size += 26;
  if (/[0-9]/.test(pw)) size += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) size += 33;
  return size || 1;
}

function formatCrackTime(seconds: number): string {
  if (seconds < 1) return "instantly";
  const units: [number, string][] = [
    [60, "seconds"],
    [60, "minutes"],
    [24, "hours"],
    [365, "days"],
    [100, "years"],
  ];
  let value = seconds;
  let unit = "seconds";
  for (const [factor, name] of units) {
    if (value < factor) {
      unit = name;
      break;
    }
    value /= factor;
    unit = name;
  }
  if (unit === "years" && value > 1e6) return "centuries+";
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${unit}`;
}

export function analyzePassword(pw: string): PasswordResult {
  const checks: PasswordChecks = {
    length: pw.length >= 12,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    numbers: /[0-9]/.test(pw),
    symbols: /[^a-zA-Z0-9]/.test(pw),
    noCommonPattern: pw.length > 0 && !hasCommonPattern(pw),
  };

  const entropyBits = pw.length
    ? Math.round(pw.length * Math.log2(charsetSize(pw)))
    : 0;

  // Base score from entropy, capped, then adjusted by checks.
  let score = Math.min(entropyBits * 1.15, 90);
  const variety = [
    checks.uppercase,
    checks.lowercase,
    checks.numbers,
    checks.symbols,
  ].filter(Boolean).length;
  score += variety * 2.5;
  if (checks.length) score += 6;
  if (pw.length >= 16) score += 4;
  if (!checks.noCommonPattern && pw.length > 0) score = Math.min(score, 28);
  if (pw.length > 0 && pw.length < 6) score = Math.min(score, 18);
  score = Math.max(0, Math.min(100, Math.round(score)));

  let label: StrengthLabel;
  if (score >= 80) label = "Very Strong";
  else if (score >= 60) label = "Strong";
  else if (score >= 35) label = "Medium";
  else label = "Weak";

  // crack time estimate at 10 billion guesses/sec (offline fast hash)
  const guesses = Math.pow(charsetSize(pw), pw.length);
  const crackTime = pw.length
    ? formatCrackTime(guesses / 1e10)
    : "—";

  const suggestions: string[] = [];
  if (!checks.length) suggestions.push("Use at least 12 characters (16+ is ideal).");
  if (!checks.uppercase) suggestions.push("Add uppercase letters (A-Z).");
  if (!checks.lowercase) suggestions.push("Add lowercase letters (a-z).");
  if (!checks.numbers) suggestions.push("Include numbers (0-9).");
  if (!checks.symbols) suggestions.push("Include symbols (!@#$%…).");
  if (!checks.noCommonPattern && pw.length > 0)
    suggestions.push("Avoid common words, repeats and keyboard sequences.");
  if (suggestions.length === 0)
    suggestions.push("Excellent! Consider a password manager and unique passwords per site.");

  return { score, label, entropyBits, checks, suggestions, crackTime };
}
