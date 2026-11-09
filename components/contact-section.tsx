import { ContactForm } from "./contact-form";
import styles from "./contact-section.module.css";

export function ContactSection({ email }: { email: string }) {
  return <section data-motion-scene="contact" className={styles.section} id="contact" aria-labelledby="contact-heading">
    <div className={styles.inner}>
      <div className={styles.chapter}><span>05 / LET’S CONNECT</span><span>FOR PILOTS. FOR TEAMS. FOR THE JOURNEY.</span></div>
      <div className={styles.layout}>
        <div className={styles.editorial}>
          <h2 id="contact-heading">Your next <br />chapter<br /><em>starts here.</em></h2>
          <p className={styles.intro}>Looking for app access, a partnership, or a simpler workflow for your aviation team? We’d love to hear from you.</p>
          <address data-motion-item className={styles.details}>
            <a className={styles.email} href={`mailto:${email}`}>{email}<span aria-hidden="true">↗</span></a>
            <div className={styles.detailRow}><span>CALL US</span><a href="tel:+639223839052">0922 383 9052</a></div>
            <div className={styles.detailRow}><span>VISIT US</span><span>Brgy. Agnaya, Plaridel, Bulacan</span></div>
          </address>
        </div>
        <ContactForm email={email} />
      </div>
    </div>
  </section>;
}
