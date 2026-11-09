"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Editorial transitions outside the product timeline. No scroll listeners or React updates. */
export function PageMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 901px)" }, ({ conditions }) => {
        if (!conditions?.motion) return;
        const distance = conditions.desktop ? 30 : 14;
        const scenes = document.querySelectorAll<HTMLElement>("[data-motion-scene]");
        scenes.forEach((scene) => {
          const heading = scene.querySelector<HTMLElement>("h2");
          const sequence = scene.querySelectorAll<HTMLElement>("[data-motion-item]");
          // Scroll-linked rather than delayed: jump navigation always resolves to readable content.
          if (heading) gsap.fromTo(heading, { y: distance, opacity: .45 }, {
            y: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: { trigger: heading, start: "top 98%", end: "top 68%", scrub: .12 },
          });
          sequence.forEach((item, index) => {
            gsap.fromTo(item, { y: distance * .65, opacity: .6 }, {
              y: 0, opacity: 1, ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 98%", end: `top ${79 - Math.min(index, 2) * 3}%`, scrub: .12 },
            });
            const number = item.querySelector<HTMLElement>("[data-motion-number]");
            if (number) gsap.fromTo(number, { color: "#8a8497" }, { color: "#5145ef", duration: .35, scrollTrigger: { trigger: item, start: "top 65%", toggleActions: "play none none reverse" } });
          });
        });
        const signature = document.querySelector<HTMLElement>("[data-motion-signature]");
        if (signature) gsap.fromTo(signature, { y: distance * .7 }, { y: 0, ease: "power2.out", scrollTrigger: { trigger: signature, start: "top 100%", end: "top 75%", scrub: .4 } });
      });
    });
    let disposed = false;
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); context.revert(); };
  }, []);
  return null;
}
