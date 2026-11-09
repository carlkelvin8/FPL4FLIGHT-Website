import styles from "./faq-accordion.module.css";

type FAQAccordionProps = {
  items: readonly (readonly [question: string, answer: string])[];
};

/** Native disclosures retain keyboard and no-JavaScript behavior. */
export function FAQAccordion({ items }: FAQAccordionProps) {
  return <div className={`faq-list ${styles.list}`}>
    {items.map(([question, answer], index) => <details key={question} name="flight-questions" className={styles.item}>
      <summary>
        <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.question}>{question}</span>
        <span className={styles.toggle} aria-hidden="true"><span /><span /></span>
      </summary>
      <div className={styles.answer}><p>{answer}</p></div>
    </details>)}
  </div>;
}
