import type { Metadata } from "next";
import { PolicyPage } from "@/components/policy-page";
import { privacyPolicy } from "@/content/policy-content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How PawFriend handles saved pets, sharing, and personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PolicyPage {...privacyPolicy} />;
}
