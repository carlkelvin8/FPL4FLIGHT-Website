"use client";
import { useEffect, useRef, useState, type FormEvent, type FocusEvent } from "react";
import { Icon } from "./icon";
import { createContactDraft, createContactEmail } from "../lib/contact-email";
import styles from "./contact-form.module.css";

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
function fieldError(field: HTMLInputElement | HTMLTextAreaElement) {
  if (!field.value.trim()) return field.name === "name" ? "Please enter your name." : field.name === "email" ? "Please enter your email address." : "Please tell us how we can help.";
  if (!field.validity.valid) return field.name === "email" ? "Enter a valid email address, such as you@example.com." : "Please check this field.";
  return undefined;
}

export function ContactForm({ email }: { email: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [interest, setInterest] = useState("App access");
  const [draft, setDraft] = useState<ReturnType<typeof createContactDraft> | null>(null);
  const draftText = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    function selectInterest(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[data-interest][href="#contact"]');
      const value = link?.dataset.interest;
      if (value && ["App access", "Flight school or team", "Partnership", "Product support"].includes(value)) {
        setInterest(value);
        setDraft(null);
        setMessage("");
      }
    }
    document.addEventListener("click", selectInterest);
    return () => document.removeEventListener("click", selectInterest);
  }, []);
  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`To: ${email}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setMessage("Email draft copied. Paste it into your email app and send it to our team.");
    } catch {
      draftText.current?.focus();
      draftText.current?.select();
      setMessage("Copy is unavailable in this browser. The draft is selected; use your device’s Copy option, then paste it into your email app.");
    }
  }
  function validateBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.currentTarget;
    setErrors((previous) => ({ ...previous, [field.name]: fieldError(field) }));
  }
  function contact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const next: Errors = {};
    let first: HTMLInputElement | HTMLTextAreaElement | undefined;
    for (const name of ["name", "email", "message"] as const) {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
      const error = fieldError(field);
      if (error) { next[name] = error; first ??= field; }
    }
    setErrors(next);
    setMessage("");
    if (first) { first.focus(); return; }
    const data = new FormData(form);
    const fields = { name: String(data.get("name")), email: String(data.get("email")), interest: String(data.get("interest")), message: String(data.get("message")) };
    setDraft(createContactDraft(fields));
    window.location.href = createContactEmail(email, fields);
    setMessage("Your email app will open with your message. Send it there to reach our team.");
  }
  return <form className={styles.form} onSubmit={contact} onChange={() => { setDraft(null); setMessage(""); }} noValidate aria-labelledby="contact-form-heading">
    <div className={styles.heading}><span>LET’S GET YOU CONNECTED</span><h3 id="contact-form-heading">Tell us what you <br />have in mind.</h3><p>App access, team inquiries, or a quick hello.</p></div>
    <div className={styles.pair}>
      <div className={styles.field}><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="Juan dela Cruz" required maxLength={100} onBlur={validateBlur} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined}/><span id="name-error" className={styles.error}>{errors.name}</span></div>
      <div className={styles.field}><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={200} onBlur={validateBlur} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined}/><span id="email-error" className={styles.error}>{errors.email}</span></div>
    </div>
    <div className={styles.field}><label htmlFor="contact-interest">Let’s talk about</label><select id="contact-interest" name="interest" value={interest} onChange={(event) => setInterest(event.target.value)}><option>App access</option><option>Flight school or team</option><option>Partnership</option><option>Product support</option></select></div>
    <div className={styles.field}><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" placeholder="Tell us how we can help…" rows={4} required maxLength={4000} onBlur={validateBlur} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined}/><span id="message-error" className={styles.error}>{errors.message}</span></div>
    <div className={styles.action}><p id="contact-handoff">Opens your email app.<br/>Nothing is submitted automatically.</p><button type="submit" aria-describedby="contact-handoff">Prepare email <Icon name="arrow" size={19}/></button></div>
    {draft && <section className={styles.draft} aria-labelledby="email-draft-heading">
      <span className={styles.draftLabel}>YOUR EMAIL DRAFT</span>
      <h4 id="email-draft-heading">Email app didn’t open?</h4>
      <p>Copy this draft into your preferred email app. Review it, then send it to our team.</p>
      <label htmlFor="contact-draft">Recipient, subject, and message</label>
      <textarea ref={draftText} id="contact-draft" readOnly value={`To: ${email}\nSubject: ${draft.subject}\n\n${draft.body}`} rows={8} />
      <button type="button" onClick={copyDraft}>Copy email draft <Icon name="forms" size={16}/></button>
    </section>}
    <p className={styles.feedback} role="status" aria-live="polite">{message}</p>
  </form>;
}
