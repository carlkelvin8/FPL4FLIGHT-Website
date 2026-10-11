"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./icon";

export function ContactForm({ email }: { email: string }) {
  const [message, setMessage] = useState("");
  function contact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const subject = `FPL4FLIGHT — ${fields.get("interest")}`;
    const body = `Name: ${fields.get("name")}\nEmail: ${fields.get("email")}\n\n${fields.get("message")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMessage("Your email app will open with your message. Send it there to reach our team.");
  }
  return <form className="contact-form" onSubmit={contact}>
    <div className="form-pair"><label>Your name<input name="name" autoComplete="name" placeholder="Juan dela Cruz" required maxLength={100} /></label><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={200} /></label></div>
    <label>Let’s talk about<select name="interest" defaultValue="App access"><option>App access</option><option>Flight school or team</option><option>Partnership</option><option>Product support</option></select></label>
    <label>Your message<textarea name="message" placeholder="Tell us how we can help…" rows={4} required maxLength={4000} /></label>
    <div className="form-bottom"><span>Opens your email app.<br />Nothing is submitted automatically.</span><button className="button primary" type="submit">Prepare email <Icon name="arrow" size={18} /></button></div>
    <p className="form-feedback" role="status">{message}</p>
  </form>;
}
