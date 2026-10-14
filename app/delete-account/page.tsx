import type { Metadata } from "next";
import { LegalPage } from "../../components/legal-page";

export const metadata: Metadata = {
  title: "Delete Your Account — FPL4FLIGHT",
  description: "Request deletion of your FPL4FLIGHT account and associated data. Find email and in-app instructions, data coverage, and retention details.",
  openGraph: {
    title: "Delete Your Account — FPL4FLIGHT",
    description: "How to request deletion of your FPL4FLIGHT account and associated data.",
    type: "website",
  },
};

export default function DeleteAccountPage() {
  return <LegalPage kind="deletion" />;
}
