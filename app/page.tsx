import Image from "next/image";
import { Icon } from "../components/icon";
import { ContactSection } from "../components/contact-section";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { ConversionSections } from "../components/conversion-sections";
import { PageMotion } from "../components/page-motion";
import { StoryExperience } from "../components/story-experience";
import { FAQAccordion } from "../components/faq-accordion";
import { SiteChatbot } from "../components/site-chatbot";

const supportEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact.fpl4flight@gmail.com";
const faqs: [string, string][] = [
  ["What is FPL4FLIGHT?", "FPL4FLIGHT is a mobile aviation workspace that brings digital forms, flight planning, logbooks, pilot tools, and community chat together. It is designed with Philippine aviation workflows in mind."],
  ["Can I use my forms offline?", "Saved forms can be opened and edited offline while your saved session remains valid. New forms from another device need to finish downloading first. Queued changes sync when you reconnect; weather and community features require a connection."],
  ["Can I sign and export documents?", "Yes. The app supports captured and attached signatures, document previews, and PDF exports for supported form templates."],
  ["How can I get access or see subscription options?", "Contact us below for app access. Current plans, prices, and eligibility are shown in the mobile app’s Subscription & Pricing page."],
  ["Can flight schools or aviation teams get in touch?", "Absolutely. Use the contact form to tell us about your team, training workflow, or partnership idea."],
];

function Brand() { return <a className="brand" href="#top" aria-label="FPL4FLIGHT AVIATION, SIMPLIFIED. Home"><Image src="/brand-logo.png" width={42} height={42} alt="" priority /><span>FPL<span className="brand-four">4</span>FLIGHT<span className="brand-caption">AVIATION, SIMPLIFIED.</span></span></a>; }

export default function Home() {
  return <>
    <PageMotion />
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader><Brand /></SiteHeader>
    <main id="main">
      <StoryExperience />
      <ConversionSections />
      <section data-motion-scene="faq" className="faq-section story-faq" id="faq"><div className="container section faq-layout"><div><span className="eyebrow section-label">04 / GOOD TO KNOW</span><h2>A few things<br />before takeoff.</h2><p>Have something else in mind?<br /><a href="#contact" className="text-link">Talk to our team <Icon size={17} /></a></p></div><FAQAccordion items={faqs} /></div></section>
      <ContactSection email={supportEmail} />
    </main>
    <SiteFooter email={supportEmail} />
    <SiteChatbot email={supportEmail} />
  </>;
}
