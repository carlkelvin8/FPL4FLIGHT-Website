import type { Metadata } from "next";
import { LegalPage } from "../../components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — FPL4FLIGHT",
  description: "Read FPL4FLIGHT’s Privacy Policy covering information collection, location, storage, sharing, retention, and your rights.",
};

export default function PrivacyPage() { return <LegalPage kind="privacy" />; }
