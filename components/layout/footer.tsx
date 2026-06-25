import Link from "next/link";
import { Shield, Github, Heart, Lock } from "lucide-react";

const TOOL_LINKS = [
  { href: "/tools/url-scanner", label: "URL Scanner" },
  { href: "/tools/phishing-detector", label: "Phishing Detector" },
  { href: "/tools/password-checker", label: "Password Checker" },
  { href: "/tools/hash-generator", label: "Hash Generator" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyber-primary to-cyber-accent">
              <Shield className="h-4 w-4 text-cyber-bg" />
            </span>
            <span className="font-extrabold">
              Saad10x <span className="gradient-text">TOOL</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            A free, modern, privacy-first cybersecurity toolkit. Everything runs
            in your browser.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Tools</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {TOOL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-cyber-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Project</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/dashboard" className="hover:text-cyber-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-cyber-primary"
              >
                <Github className="h-4 w-4" /> Source
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Privacy</h4>
          <p className="inline-flex items-start gap-2 text-sm text-muted-foreground">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-cyber-success" />
            No tracking, no analytics, no password storage. 100% client-side.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Saad10x TOOL. MIT Licensed. Free &
            open-source.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Built with <Heart className="h-4 w-4 text-cyber-danger" /> by Saad
            Ishaq
          </p>
        </div>
      </div>
    </footer>
  );
}
