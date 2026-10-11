import type { Metadata } from "next";
import { LegalPage } from "../../components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions — FPL4FLIGHT",
  description: "Read the Terms & Conditions for the FPL4FLIGHT mobile app, including acceptable use, service limitations, and account responsibilities.",
};

export default function TermsPage() { return <LegalPage kind="terms" />; }
