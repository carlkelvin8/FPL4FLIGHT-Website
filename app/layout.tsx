import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FPL4FLIGHT — Less paperwork. More sky.",
  description: "Meet FPL4FLIGHT: digital aviation forms, flight planning, pilot logbooks, and a connected pilot community. Built with Philippine pilots in mind.",
  openGraph: {
    title: "FPL4FLIGHT — Your flying life, connected.",
    description: "A simpler way to prepare, document, and connect. Discover the company behind FPL4FLIGHT.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
