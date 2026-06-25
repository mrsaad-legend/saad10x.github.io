import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/particle-background";

export const metadata: Metadata = {
  title: {
    default: "Saad10x TOOL — Free Cybersecurity Toolkit",
    template: "%s · Saad10x TOOL",
  },
  description:
    "A free, modern, privacy-first cybersecurity toolkit. Scan URLs, detect phishing, check password strength and generate hashes — all client-side.",
  keywords: [
    "cybersecurity",
    "url scanner",
    "phishing detector",
    "password strength",
    "hash generator",
    "security tools",
  ],
  authors: [{ name: "Saad Ishaq" }],
  openGraph: {
    title: "Saad10x TOOL — Free Cybersecurity Toolkit",
    description:
      "Scan URLs, detect phishing, check password strength and generate hashes — all free and client-side.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <ParticleBackground />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
