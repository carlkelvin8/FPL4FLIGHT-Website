import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";
import { legalUpdated, privacySections, termsSections } from "../lib/legal-content";

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const privacy = kind === "privacy";
  const sections = privacy ? privacySections : termsSections;
  const title = privacy ? "Privacy Policy" : "Terms & Conditions";
  const email = privacy ? "privacy@fpl4flight.io" : "support@fpl4flight.io";
  return <>
    <a className="skip-link" href="#legal-content">Skip to policy</a>
    <header className="site-header"><div className="container nav legal-nav"><Link href="/" className="brand" aria-label="FPL4FLIGHT home"><Image src="/brand-logo.png" width={42} height={42} alt="" /><span>FPL<span className="brand-four">4</span>FLIGHT<span className="brand-caption">AVIATION, SIMPLIFIED.</span></span></Link><Link href="/" className="text-link">Back to home <Icon size={17} /></Link></div></header>
    <main className="container legal-main" id="legal-content">
      <div className="legal-heading"><span className="eyebrow section-label">FPL4FLIGHT / LEGAL</span><h1>{title}</h1><p>{privacy ? "How we collect, use, and protect information in the FPL4FLIGHT app." : "The terms that govern your use of the FPL4FLIGHT app."}</p><span className="legal-updated">Last updated: <time dateTime="2026-08-19">{legalUpdated}</time></span></div>
      <nav className="legal-switch" aria-label="Legal documents"><Link href="/privacy" aria-current={privacy ? "page" : undefined}>Privacy Policy</Link><Link href="/terms" aria-current={!privacy ? "page" : undefined}>Terms & Conditions</Link></nav>
      <div className="legal-layout"><aside className="legal-sidebar"><nav aria-label="On this page"><span className="eyebrow">ON THIS PAGE</span>{sections.map((section, index) => <a href={`#${section.id}`} key={section.id}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</a>)}</nav><a className="legal-help" href={`mailto:${email}`}><Icon name="mail" size={20} /><span>Questions about this policy?<strong>Contact our team ↗</strong></span></a></aside>
        <article className="legal-document" aria-label={title}>
          {privacy && <div className="legal-website-note"><h2>About this company website</h2><p>The app policy below is also available inside FPL4FLIGHT. This company website does not access your mobile account or app data. Its contact form prepares an email on your device; your message is sent only when you send it from your email app. The site loads fonts from Google Fonts, so your browser makes requests to that service.</p></div>}
          {sections.map((section, index) => <section className={`legal-section${section.id === "disclaimer" ? " legal-disclaimer" : ""}`} id={section.id} key={section.id}><h2><span>{String(index + 1).padStart(2, "0")}.</span>{section.title}</h2>{section.introduction && <p>{section.introduction}</p>}{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}{section.id === "contact" && <a className="text-link legal-email" href={`mailto:${email}`}>{email}<Icon size={17} /></a>}</section>)}
        </article>
      </div>
    </main>
    <footer className="site-footer"><div className="container footer-bottom legal-footer"><span>© {new Date().getFullYear()} FPL4FLIGHT. All rights reserved.</span><nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/privacy" aria-current={privacy ? "page" : undefined}>Privacy Policy</Link><Link href="/terms" aria-current={!privacy ? "page" : undefined}>Terms & Conditions</Link></nav></div></footer>
  </>;
}
