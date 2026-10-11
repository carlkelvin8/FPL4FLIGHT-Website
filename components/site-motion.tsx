"use client";

import { useEffect, useRef } from "react";

/** CSS does the continuous motion; observers and frames only handle user input. */
export function SiteMotion() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let cleanup = () => {};

    function start() {
      cleanup();
      if (preference.matches) return;
      if (typeof IntersectionObserver === "undefined") return;
      const stage = document.querySelector<HTMLElement>(".product-stage");
      const root = document.querySelector<HTMLElement>("#main");
      if (!stage || !root) return;
      let scrollFrame = 0;
      let pointerFrame = 0;
      const elements = Array.from(root.querySelectorAll<HTMLElement>(
        ".company > div, .section-heading, .feature, .workflow article, .offline-callout, .faq-layout > div, .contact-copy, .contact-form",
      ));
      const reveal = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "visible";
          reveal.unobserve(entry.target);
        }
      }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
      elements.forEach((element) => {
        // Content is always visible without JS; only upcoming content is hidden.
        if (element.getBoundingClientRect().top < window.innerHeight - 35) return;
        element.dataset.reveal = "pending";
        if (element.matches(".feature, .workflow article")) {
          const siblings = Array.from(element.parentElement?.children ?? []);
          element.style.setProperty("--reveal-delay", `${(siblings.indexOf(element) % 3) * 100}ms`);
        }
        reveal.observe(element);
      });
      const visibility = new IntersectionObserver(([entry]) => {
        stage.dataset.motionVisible = String(entry?.isIntersecting ?? false);
      });
      visibility.observe(stage);
      function updateScroll() {
        if (scrollFrame) return;
        scrollFrame = requestAnimationFrame(() => {
          scrollFrame = 0;
          const distance = document.documentElement.scrollHeight - window.innerHeight;
          progress.current?.style.setProperty("--scroll-progress", String(distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0));
        });
      }
      function pointer(event: PointerEvent) {
        if (!finePointer.matches || pointerFrame) return;
        const bounds = stage!.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
        const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
        pointerFrame = requestAnimationFrame(() => {
          pointerFrame = 0;
          stage!.style.setProperty("--tilt-x", `${-y * 8}deg`);
          stage!.style.setProperty("--tilt-y", `${x * 11}deg`);
          stage!.style.setProperty("--pointer-x", `${x * 18}px`);
          stage!.style.setProperty("--pointer-y", `${y * 18}px`);
        });
      }
      function resetPointer() {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        ["--tilt-x", "--tilt-y", "--pointer-x", "--pointer-y"].forEach((key) => stage!.style.removeProperty(key));
      }
      function documentVisibility() { stage!.dataset.motionPaused = String(document.hidden); }
      stage.addEventListener("pointermove", pointer);
      stage.addEventListener("pointerleave", resetPointer);
      window.addEventListener("scroll", updateScroll, { passive: true });
      window.addEventListener("resize", updateScroll, { passive: true });
      document.addEventListener("visibilitychange", documentVisibility);
      documentVisibility();
      updateScroll();
      cleanup = () => {
        reveal.disconnect();
        visibility.disconnect();
        cancelAnimationFrame(scrollFrame);
        resetPointer();
        stage.removeEventListener("pointermove", pointer);
        stage.removeEventListener("pointerleave", resetPointer);
        window.removeEventListener("scroll", updateScroll);
        window.removeEventListener("resize", updateScroll);
        document.removeEventListener("visibilitychange", documentVisibility);
        delete stage.dataset.motionPaused;
        delete stage.dataset.motionVisible;
        elements.forEach((element) => { delete element.dataset.reveal; element.style.removeProperty("--reveal-delay"); });
        progress.current?.style.removeProperty("--scroll-progress");
      };
    }
    start();
    preference.addEventListener("change", start);
    return () => { cleanup(); preference.removeEventListener("change", start); };
  }, []);

  return <div className="scroll-progress" ref={progress} aria-hidden="true" />;
}
