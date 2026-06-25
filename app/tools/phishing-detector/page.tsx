import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tools/tool-page-header";
import { PhishingDetectorTool } from "@/components/tools/phishing-detector-tool";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "AI Phishing Detector",
  description:
    "Detect fake domains, typosquatting, suspicious subdomains and credential-harvesting patterns with confidence scoring.",
};

export default function PhishingDetectorPage() {
  return (
    <PageTransition>
      <div className="container max-w-4xl py-12">
        <ToolPageHeader slug="phishing-detector" />
        <PhishingDetectorTool />
      </div>
    </PageTransition>
  );
}
