import styles from "./conversion-sections.module.css";

const audiences = [
  {
    number: "01",
    title: "For pilots.",
    description: "Bring flight preparation, digital forms, and pilot records into one mobile workspace.",
    details: "Flight plans · Signatures · PDF exports · Pilot logbooks",
    action: "Ask about app access",
    interest: "App access",
  },
  {
    number: "02",
    title: "For flight schools.",
    description: "Tell us how your school handles flight documentation, training records, and everyday preparation.",
    details: "Digital forms · Checklists · Pilot and aircraft records",
    action: "Talk about your school",
    interest: "Flight school or team",
  },
  {
    number: "03",
    title: "For aviation teams.",
    description: "Start a conversation about your team's paperwork, preparation workflow, or partnership idea.",
    details: "Flight preparation · Documentation · Pilot community",
    action: "Discuss your workflow",
    interest: "Flight school or team",
  },
] as const;

export function ConversionSections() {
  return <>
    <section data-motion-scene="audience" className={styles.audience} id="for-you" aria-labelledby="audience-heading">
      <div className={styles.inner}>
        <div className={styles.introduction}>
          <span className={styles.eyebrow}>FIND YOUR WAY FORWARD</span>
          <h2 id="audience-heading">Your flying day.<br /><em>Your starting point.</em></h2>
          <p>From individual pilots to flight schools and aviation teams, tell us what a simpler workflow would look like for you.</p>
        </div>
        <div className={styles.audiences}>
          {audiences.map((audience) => <article data-motion-item key={audience.number} className={styles.audienceRow}>
            <span data-motion-number className={styles.number} aria-hidden="true">{audience.number}</span>
            <div className={styles.audienceContent}>
              <h3>{audience.title}</h3>
              <p>{audience.description}</p>
              <span className={styles.details}>{audience.details}</span>
            </div>
            <a className={styles.audienceAction} href="#contact" data-interest={audience.interest}>{audience.action}<span aria-hidden="true">↗</span></a>
          </article>)}
        </div>
      </div>
    </section>
    <section data-motion-scene="access" className={styles.access} id="app-access" aria-labelledby="access-heading">
      <div className={styles.accessInner}>
        <div className={styles.accessHeading}>
          <span className={styles.eyebrow}>LET’S GET YOU CONNECTED</span>
          <h2 id="access-heading">A clear next step.<br /><em>Start a conversation.</em></h2>
          <a className={styles.primaryAction} href="#contact" data-interest="App access">Request app access<span aria-hidden="true">→</span></a>
        </div>
        <div className={styles.accessBody}>
          <ol className={styles.steps}>
            <li data-motion-item><span data-motion-number aria-hidden="true">01</span><div><h3>Tell us about your flying day.</h3><p>Choose app access, a flight school or team inquiry, a partnership, or product support.</p></div></li>
            <li data-motion-item><span data-motion-number aria-hidden="true">02</span><div><h3>Prepare your email.</h3><p>Use the contact form to open your email app with your message. Send it there to reach our team.</p></div></li>
            <li data-motion-item><span data-motion-number aria-hidden="true">03</span><div><h3>Explore access and plans.</h3><p>Ask our team about access. Current plans, prices, and eligibility are shown in the mobile app’s Subscription &amp; Pricing page.</p></div></li>
          </ol>
          <p className={styles.note}>Your email application handles the message. Nothing is submitted automatically through this website.</p>
        </div>
      </div>
    </section>
  </>;
}
