import type { Metadata } from "next";
import { ToolPageHeader } from "@/components/tools/tool-page-header";
import { PasswordCheckerTool } from "@/components/tools/password-checker-tool";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Password Strength Checker",
  description:
    "Real-time password strength analysis with entropy scoring and improvement tips. Passwords never leave your device.",
};

export default function PasswordCheckerPage() {
  return (
    <PageTransition>
      <div className="container max-w-4xl py-12">
        <ToolPageHeader slug="password-checker" />
        <PasswordCheckerTool />
      </div>
    </PageTransition>
  );
}
