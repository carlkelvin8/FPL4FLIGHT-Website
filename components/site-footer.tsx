import Image from "next/image";
import Link from "next/link";
import styles from "./site-footer.module.css";

const destinations = [
  ["#company", "Our company"],
  ["#platform", "The platform"],
  ["#why-us", "Why FPL4FLIGHT"],
  ["#faq", "FAQs"],
] as const;

/** Server-rendered closing chapter; every action works without animation. */
export function SiteFooter({ email }: { email: string }) {
  return <footer data-motion-scene="footer" className={styles.footer} aria-label="FPL4FLIGHT footer">
    <div className={styles.inner}>
      <div className={styles.prelude}><span>AVIATION, SIMPLIFIED.</span><a href="#top">Back to top <span aria-hidden="true">↑</span></a></div>
      <div className={styles.statement}>
        <h2>Less paperwork.<br /><em>More sky.</em></h2>
        <a className={styles.invitation} href="#contact">Let’s connect <span aria-hidden="true">↗</span></a>
      </div>
      <div data-motion-item className={styles.information}>
        <address className={styles.contact}>
          <a className={styles.email} href={`mailto:${email}`}>{email}</a>
          <div><a href="tel:+639223839052">0922 383 9052</a><span>Brgy. Agnaya, Plaridel, Bulacan</span></div>
        </address>
        <nav className={styles.navigation} aria-label="Footer main navigation">{destinations.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav>
      </div>
      <a data-motion-signature className={styles.signature} href="#top" aria-label="FPL4FLIGHT — back to top"><Image src="/brand-logo.png" width={58} height={58} alt="" /><span>FPL<span className={styles.four}>4</span>FLIGHT</span></a>
      <div className={styles.legal}><span>© {new Date().getFullYear()} FPL4FLIGHT. All rights reserved.</span><nav aria-label="Footer legal documents"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link><Link href="/delete-account">Delete Account</Link></nav></div>
    </div>
  </footer>;
}
