import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tools/tool-page-header";
import { UrlScannerTool } from "@/components/tools/url-scanner-tool";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "URL Scanner",
  description:
    "Analyze any URL for suspicious keywords, shortened links and risky domains with a 0–100 security score.",
};

export default function UrlScannerPage() {
  return (
    <PageTransition>
      <div className="container max-w-3xl py-12">
        <ToolPageHeader slug="url-scanner" />
        <UrlScannerTool />
      </div>
    </PageTransition>
  );
}
