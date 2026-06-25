import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tools/tool-page-header";
import { HashGeneratorTool } from "@/components/tools/hash-generator-tool";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Hash Generator",
  description:
    "Instantly generate MD5, SHA-1, SHA-256 and SHA-512 hashes with one-click copy. Fully client-side.",
};

export default function HashGeneratorPage() {
  return (
    <PageTransition>
      <div className="container max-w-3xl py-12">
        <ToolPageHeader slug="hash-generator" />
        <HashGeneratorTool />
      </div>
    </PageTransition>
  );
}
