"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "./icon";
import styles from "./site-chatbot.module.css";

type Message = { from: "visitor" | "assistant"; text: string };

const answers: { terms: string[]; text: string }[] = [
  { terms: ["what is", "about", "fpl4flight", "app", "pilot app"], text: "FPL4FLIGHT is a mobile aviation workspace with digital forms, flight planning, pilot and aircraft logbooks, and a pilot community. It’s designed with Philippine aviation workflows in mind." },
  { terms: ["offline", "internet", "connection", "sync"], text: "Saved forms can be opened and edited offline while your saved session remains valid. Queued changes sync when you reconnect. Weather and community features need an internet connection." },
  { terms: ["price", "pricing", "subscription", "plan", "cost"], text: "Current plans, prices, and eligibility are shown in the mobile app’s Subscription & Pricing page. Contact our team if you have questions about access." },
  { terms: ["access", "download", "get started", "sign up"], text: "Contact our team to ask about app access. Current plans, prices, and eligibility are shown in the mobile app’s Subscription & Pricing page." },
  { terms: ["sign", "signature", "export", "pdf", "document"], text: "Supported forms can include captured or attached signatures, document previews, and PDF exports." },
  { terms: ["school", "team", "partnership", "partner"], text: "We’d be happy to hear about your school, aviation team, or partnership idea. Choose “Flight school or team” or “Partnership” in the contact form." },
];
const suggestions = ["What is FPL4FLIGHT?", "Can I work offline?", "How do I get access?"];
const fallback = "I can help with the app, offline forms, pricing, documents, or contacting the team. Try one of those topics, or use the contact form and we’ll be glad to help.";

function answerQuestion(question: string) {
  const normalized = question.toLocaleLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
  const match = answers.find(({ terms }) => terms.some((term) => normalized.includes(term)));
  return match?.text ?? fallback;
}

export function SiteChatbot({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "assistant", text: "Hi! I’m the FPL4FLIGHT guide. What would you like to know?" }]);
  const [notice, setNotice] = useState("");
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => { if (open && messages.length > 1) log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" }); }, [messages, open]);

  function ask(question: string) {
    const clean = question.trim().slice(0, 400);
    if (!clean) return;
    const answer = answerQuestion(clean);
    setMessages((current) => [...current, { from: "visitor", text: clean }, { from: "assistant", text: answer.includes("our team") ? answer.replace("our team", `our team at ${email}`) : answer }]);
    setDraft("");
    setNotice("");
  }
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); ask(draft); }

  return <div className={styles.root}>
    {open && <section className={styles.panel} aria-labelledby="chat-title">
      <header className={styles.header}><span className={styles.mark}><Icon name="chat" size={19}/></span><div><h2 id="chat-title">FPL4FLIGHT guide</h2><span>Quick answers about the app</span></div><button className={styles.close} type="button" aria-label="Close chat" onClick={() => setOpen(false)}>×</button></header>
      <div className={styles.transparency}>Automated replies from a fixed set of answers.</div>
      <div ref={log} className={styles.log} role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversation">
        {messages.map((message, index) => <p className={message.from === "visitor" ? styles.visitor : styles.reply} key={`${index}-${message.from}`}>{message.text}</p>)}
      </div>
      {messages.length === 1 && <div className={styles.suggestions} aria-label="Suggested questions">{suggestions.map((question) => <button type="button" key={question} onClick={() => ask(question)}>{question}</button>)}</div>}
      <form className={styles.form} onSubmit={submit}><label className={styles.srOnly} htmlFor="chat-message">Ask a question</label><input ref={input} id="chat-message" value={draft} maxLength={400} onChange={(event) => { setDraft(event.target.value); setNotice(""); }} placeholder="Ask about the app…"/><button type="submit" disabled={!draft.trim()} aria-label="Send question"><Icon name="arrow" size={19}/></button></form>
      {notice && <p className={styles.notice} role="status">{notice}</p>}
      <a className={styles.contact} href="#contact" onClick={() => setOpen(false)}>Still have a question? Contact the team <span aria-hidden="true">↗</span></a>
    </section>}
    <button type="button" className={styles.launcher} aria-label={open ? "Close chat" : "Ask FPL4FLIGHT a question"} title={open ? "Close chat" : "Ask FPL4FLIGHT a question"} aria-expanded={open} aria-controls="chat-title" onClick={() => setOpen((value) => !value)}><Icon name={open ? "check" : "chat"} size={21}/></button>
  </div>;
}
