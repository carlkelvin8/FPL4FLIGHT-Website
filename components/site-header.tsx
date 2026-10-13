"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./icon";

const links = [
  ["#company", "Our company"],
  ["#platform", "The platform"],
  ["#why-us", "Why FPL4FLIGHT"],
  ["#faq", "FAQs"],
] as const;

export function SiteHeader({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      }
    }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    function onPointer(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    const viewport = window.matchMedia("(min-width: 801px)");
    const closeOnDesktop = () => { if (viewport.matches) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    viewport.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      viewport.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  return <header className="site-header" ref={header}>
    <div className="container nav">
      {children}
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([href, label]) => <a key={href} href={href} aria-current={active === href ? "location" : undefined}>{label}</a>)}
      </nav>
      <a href="#contact" className="button small primary nav-contact" onClick={() => setOpen(false)}>Let’s connect <Icon size={17} /></a>
      <button ref={menuButton} className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
    <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
      {links.map(([href, label], index) => <a key={href} href={href} onClick={() => setOpen(false)} aria-current={active === href ? "location" : undefined}><span>0{index + 1}</span>{label}<Icon size={18} /></a>)}
      <a href="#contact" onClick={() => setOpen(false)}><span>05</span>Contact our team<Icon size={18} /></a>
    </nav>
  </header>;
}
