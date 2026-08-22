import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { accessibilityStatement } from "@/content/policy-content";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "PawFriend’s accessibility approach, current safeguards, and known limitations.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return <PolicyPage {...accessibilityStatement} />;
}
