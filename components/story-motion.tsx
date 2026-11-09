"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** One owner for scroll transforms; CSS provides the complete static fallback. */
export function StoryMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>(".story-experience");
    if (!root) return;
    const controls = Array.from(root.querySelectorAll<HTMLAnchorElement>(".product-controls a"));
    const scenes = Array.from(root.querySelectorAll<HTMLElement>(".feature-scene"));
    let activeScene = -1;
    const setActiveScene = (index: number) => {
      if (index === activeScene) return;
      activeScene = index;
      controls.forEach((control, position) => {
        if (position === index) control.setAttribute("aria-current", "step");
        else control.removeAttribute("aria-current");
      });
    };
    setActiveScene(0);
    const sceneObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
      if (root.classList.contains("product-camera")) return;
      const current = entries.find((entry) => entry.isIntersecting);
      if (current) setActiveScene(scenes.indexOf(current.target as HTMLElement));
    }, { rootMargin: "-25% 0px -45% 0px" });
    scenes.forEach((scene) => sceneObserver?.observe(scene));
    const progress = root.querySelector<HTMLElement>(".cinema-progress");
    const progressTrigger = progress ? ScrollTrigger.create({
      trigger: document.documentElement, start: "top top", end: "bottom bottom", invalidateOnRefresh: true,
      onUpdate: (trigger) => gsap.set(progress, { scaleX: trigger.progress }),
      onRefresh: (trigger) => gsap.set(progress, { scaleX: trigger.progress }),
    }) : null;
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cursor = root.querySelector<HTMLElement>(".custom-cursor");
      if (!cursor) return;
      const moveX = gsap.quickTo(cursor, "x", { duration: .1, ease: "power3.out" });
      const moveY = gsap.quickTo(cursor, "y", { duration: .1, ease: "power3.out" });
      const onMove = (event: PointerEvent) => {
        moveX(event.clientX);
        moveY(event.clientY);
        cursor.classList.add("is-visible");
        const target = event.target instanceof Element ? event.target.closest("a, button, [role='tab'], input, select, textarea, label") : null;
        cursor.classList.toggle("is-interactive", Boolean(target));
        if (target) document.documentElement.classList.add("custom-cursor-enabled");
        else document.documentElement.classList.remove("custom-cursor-enabled");
      };
      const onLeave = (event: PointerEvent) => {
        if (!event.relatedTarget) {
          cursor.classList.remove("is-visible", "is-interactive");
          document.documentElement.classList.remove("custom-cursor-enabled");
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      return () => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        document.documentElement.classList.remove("custom-cursor-enabled");
        cursor.classList.remove("is-visible", "is-interactive");
        gsap.killTweensOf(cursor);
      };
    });
    const context = gsap.context(() => {
      media.add({ desktop: "(min-width: 901px) and (min-height: 650px)", motion: "(prefers-reduced-motion: no-preference)" }, ({ conditions }) => {
        if (!conditions?.motion) return;
        const desktop = conditions.desktop;
        root.classList.add("motion-ready");
        const panels = scenes.map((scene) => scene.querySelector<HTMLElement>(".story-screen"));
        const chapters = gsap.utils.toArray<HTMLElement>(".story-chapter");
        gsap.from(".title-line > *", { yPercent: 110, stagger: .12, duration: 1, ease: "power4.out" });
        // Complete each reveal before it reaches reading position. Transform and
        // opacity keep text crisp and avoid repainting large blur/clip surfaces.
        const introductions = gsap.utils.toArray<HTMLElement>(".opening-copy, .journey-heading, .workflow-intro, .community-inner > div:first-child");
        introductions.forEach((introduction) => {
          const elements = Array.from(introduction.children).filter((element) => !element.matches(".experience-route"));
          gsap.fromTo(elements, { y: desktop ? 28 : 14, opacity: .35 }, {
            y: 0, opacity: 1, stagger: .09, duration: .7, ease: "power2.out",
            scrollTrigger: { trigger: introduction, start: "top 94%", end: "top 52%", scrub: .4 },
          });
        });
        if (!desktop) {
          scenes.forEach((scene) => {
            const copy = scene.querySelector(".chapter-copy");
            const panel = scene.querySelector(".feature-interface");
            gsap.fromTo([copy, panel].filter(Boolean), { y: 18, opacity: .5 }, {
              y: 0, opacity: 1, stagger: .14, duration: .7, ease: "power2.out",
              scrollTrigger: { trigger: scene, start: "top 94%", end: "top 48%", scrub: .3 },
            });
          });
        }
        const steps = gsap.utils.toArray<HTMLElement>(".workflow-step");
        steps.forEach((step) => {
          gsap.fromTo(step, { y: desktop ? 24 : 12, opacity: .55 }, {
            y: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: { trigger: step, start: "top 92%", end: "top 62%", scrub: .35,
              toggleClass: { targets: step, className: "is-active" },
            },
          });
        });
        // The dark brand chapter becomes a short, three-beat flight sequence.
        // Pin only on roomy pointer-driven screens; touch keeps its natural flow.
        const experience = root.querySelector<HTMLElement>(".story-experience-section");
        const experienceTitle = experience?.querySelector<HTMLElement>("h2");
        const experienceTags = experience?.querySelectorAll<HTMLElement>(".experience-tags span");
        const experienceRoute = experience?.querySelector<HTMLElement>(".experience-route");
        if (desktop && experience && experienceTitle && experienceTags?.length && experienceRoute) {
          const experienceTimeline = gsap.timeline({ defaults:{ease:"none"}, scrollTrigger:{
            trigger:experience,start:"top 78%",end:()=>`+=${Math.round(window.innerHeight*.85)}`,
            pin:false,scrub:.12,invalidateOnRefresh:true,
          }});
          experienceTimeline
            .fromTo(experienceTitle,{y:24,scale:.92,transformOrigin:"0% 50%"},{y:0,scale:1,duration:.75},0)
            .fromTo(experienceTags,{y:18,opacity:.35,rotateX:6,stagger:.1},{y:0,opacity:1,rotateX:0,duration:.5},.35)
            .fromTo(experienceRoute,{y:18,opacity:.45,scaleX:.9,transformOrigin:"left center"},{y:0,opacity:1,scaleX:1,duration:.65},.8)
            .to(experienceTitle,{y:-24,scale:.92,opacity:.8,duration:.55},1.85)
            .to(experienceTags,{y:-18,opacity:.6,stagger:.06,duration:.55},1.85);
        }
        const community = root.querySelector<HTMLElement>(".story-community");
        const communityCopy = community?.querySelector<HTMLElement>(".community-inner > div:first-child");
        const communityBoard = community?.querySelector<HTMLElement>(".community-board");
        if (community && communityCopy && communityBoard) {
          gsap.fromTo(communityCopy,{x:desktop?-36:0,opacity:.55},{x:0,opacity:1,ease:"power2.out",scrollTrigger:{trigger:community,start:"top 82%",end:"center center",scrub:.5}});
          gsap.fromTo(communityBoard,{y:desktop?42:18,rotateY:desktop?-7:0,scale:.94,opacity:.55,transformOrigin:"50% 50%"},{y:0,rotateY:0,scale:1,opacity:1,ease:"power2.out",scrollTrigger:{trigger:community,start:"top 78%",end:"center 42%",scrub:.55}});
        }
        const takeoff = root.querySelector<HTMLElement>(".story-takeoff");
        const takeoffCopy = takeoff?.querySelector<HTMLElement>(".takeoff-content");
        if(takeoff && takeoffCopy){
        gsap.fromTo(takeoffCopy,{y:desktop?28:14,scale:desktop?.98:1,opacity:.8},{y:0,scale:1,opacity:1,ease:"power2.out",scrollTrigger:{trigger:takeoff,start:"top 88%",end:"top 34%",scrub:.12}});
          gsap.fromTo(takeoff,{backgroundColor:"#dcd9ec"},{backgroundColor:"#eeecf8",scrollTrigger:{trigger:takeoff,start:"top bottom",end:"top 30%",scrub:.5}});
        }
        const caption = root.querySelector<HTMLElement>(".hero-product-caption");
        if (caption?.children.length) gsap.from(Array.from(caption.children), {
          y: 16, opacity: 0, stagger: .08, duration: .7, ease: "power3.out",
          scrollTrigger: { trigger: caption, start: "top 90%", toggleActions: "play none none reverse" },
        });
        // Entrance owns opacity only; the scrub timeline owns camera transforms.
        gsap.from(".hero-product-band .product-stage", { opacity: 0, duration: 1.2, ease: "power3.out" });
        gsap.fromTo(".narrative-route path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: .3 } });
        const heroBand = root.querySelector<HTMLElement>(".hero-product-band");
        const heroHeading = root.querySelector<HTMLElement>(".editorial-hero-heading");
        const stage = root.querySelector<HTMLElement>(".hero-product-band .product-stage");
        // The handset is CSS-module scoped; select its stable module token.
        const phone = root.querySelector<HTMLElement>('.hero-product-band [class*="device"]');
        const paper = root.querySelector<HTMLElement>(".paper-scatter");
        if (desktop && heroBand && heroHeading && stage && phone && paper) {
          root.classList.add("cinematic-flight");
          const flight = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
            trigger: heroBand, start: "top top", end: () => `+=${Math.round(window.innerHeight * 1.3)}`,
            scrub: .14, pin: true, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
          } });
          flight.addLabel("departure")
            .to(heroHeading, { yPercent: -38, scale: .72, opacity: .3, duration: .9 }, "departure")
            .to(stage, { scale: 1.38, xPercent: -10, yPercent: 1, duration: 1.1, transformOrigin: "58% 48%" }, "departure")
            .to(phone, { rotateY: -14, rotateX: 5, rotateZ: 0, scale: 1.45, duration: 1.1, transformOrigin: "50% 50%" }, "departure")
            .to(".hero-product-caption", { xPercent: -35, opacity: 0, duration: .48 }, "departure+=.4")
            .to(".hero-product-label", { xPercent: 30, opacity: .2, duration: .7 }, "departure+=.2")
            .to(".hero-product-band", { backgroundColor: "#e1def0", duration: 1.15 }, "departure")
            .to(stage, { scale: 1.58, xPercent: -7, yPercent: 2, rotateY: 8, duration: .9 }, "departure+=.55")
            .to(phone, { rotateY: 0, rotateX: 0, rotateZ: -3, scale: 1.65, duration: .9 }, "departure+=.55")
            .to(heroBand, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: .5 }, "departure+=.95");
          gsap.set(phone, { transformPerspective: 1100, transformOrigin: "50% 50%" });
          gsap.timeline({ scrollTrigger: { trigger: ".story-opening", start: "top bottom", end: "top 30%", scrub: .6 } })
            .fromTo(paper, { perspective: 1100, rotateY: -12, rotateX: 5, scale: .86, transformOrigin: "50% 50%" },
              { perspective: 1100, rotateY: 0, rotateX: 0, scale: 1, ease: "power2.out" });
        }
        if (desktop && scenes.length) {
          // A stacked editorial hero leaves the viewport naturally; no pinned camera.
          // Reveal the product as it enters the editorial band; this timeline owns
          // clipping only, keeping the exit camera transforms independent.
          gsap.fromTo(".hero-product-band .product-stage", { clipPath: "inset(4% 7% 4% 7% round 24px)" }, {
            clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.out",
            scrollTrigger: { trigger: ".hero-product-band", start: "top 92%", end: "top 32%", scrub: .6 },
          });
          const sheets = gsap.utils.toArray<HTMLElement>(".paper-sheet");
          const paperwork = gsap.timeline({ scrollTrigger: { trigger: ".story-opening", start: "top 85%", end: "bottom 35%", scrub: .6 } });
          paperwork.addLabel("complexity").to(sheets, { x: (i) => (i - 1) * 150, y: (i) => i % 2 ? -24 : 18, rotation: (i) => (i - 1) * 7, scale: 1.02, duration: .8 }, "complexity")
            .addLabel("clarity").to(sheets, { x: 0, y: (i) => i * 9, rotation: 0, scale: .92, duration: 1 }, "clarity")
            .fromTo(".paper-organized", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .5 }, "clarity+=.5");
          // Keep the chapter sequence in normal document flow. Pinning this large
          // grid on top of the pinned hero could leave a blank viewport on refresh.
          let pendingFocus: { index: number; target: HTMLElement; source: HTMLElement } | null = null;
          let restoreInitialChapter = true;
          const temporaryFocusTargets = new Map<HTMLElement, string | null>();
          const chapterDuration = 1.6;
          const chapterRest = .95;
          const camera = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
            trigger: ".journey-grid", start: "top 110px", end: () => `+=${scenes.length * Math.max(380, Math.min(560, window.innerHeight * .6))}`, scrub: .14, pin: false, anticipatePin: 1, invalidateOnRefresh: true,
          } });
          scenes.forEach((scene, i) => {
            const at = i * chapterDuration;
            camera.addLabel(`chapter-${i}`, at);
            // Finish the outgoing copy before the next chapter becomes visible.
            if (i) camera.to(scenes[i - 1], { autoAlpha: 0, y: -16, duration: .24, ease: "power1.in" }, at)
              .to(scene, { autoAlpha: 1, y: 0, duration: .4, ease: "power2.out" }, at + .24);
            const control = controls[i];
            if (control) {
              camera.fromTo(control, { "--chapter-progress": 0 }, { "--chapter-progress": 1, duration: chapterDuration }, at);
              const number = control.querySelector<HTMLElement>("span");
              if (number) camera.fromTo(number, { y: 3, opacity: .65 }, { y: 0, opacity: 1, duration: .35 }, at + .12);
            }
            const panel = panels[i];
            if (panel) {
              camera.fromTo(panel, { scale: .985, y: 12 }, { scale: 1, y: 0, duration: .65, ease: "power2.out" }, at + .3);
              // Highlight existing form rows, planning tools, records, and channels.
              // The stagger makes the capability legible within the camera hold.
              const details = panel.querySelectorAll<HTMLElement>(".screen-row, .screen-route, .screen-weather, .record-total, .community-channel");
              if (details.length) camera.fromTo(details, { x: 9, opacity: 1 }, {
                x: 0, opacity: 1, stagger: .07, duration: .38, ease: "power2.out",
              }, at + .42);
            }
            const heading = scene.querySelector<HTMLElement>(".chapter-copy h3");
            if (heading) camera.fromTo(heading, { y: 10 }, {
              y: 0, duration: .4, ease: "power2.out",
            }, at + .3);
          });
          // Reserve a reading hold for the final scene, just like earlier chapters.
          camera.to({}, { duration: .5 }, (scenes.length - 1) * chapterDuration + 1.1);
          const sceneProgress = root.querySelector<HTMLElement>(".journey-progress i");
          if (sceneProgress) camera.to(sceneProgress, { scaleY: 1, duration: camera.duration(), ease: "none" }, 0);
          const updateCamera = () => {
            const time = camera.time();
            setActiveScene(Math.min(scenes.length - 1, Math.max(0, Math.floor((time - .24) / chapterDuration))));
            if (!pendingFocus || time < pendingFocus.index * chapterDuration + .7 || time > pendingFocus.index * chapterDuration + 1.5) return;
            const request = pendingFocus;
            pendingFocus = null;
            // Only explicit keyboard activation moves focus, once its scene is visible.
            // Abandon the request if the visitor has already moved focus elsewhere.
            if (document.activeElement !== request.source) return;
            if (!temporaryFocusTargets.has(request.target)) temporaryFocusTargets.set(request.target, request.target.getAttribute("tabindex"));
            request.target.setAttribute("tabindex", "-1");
            request.target.focus({ preventScroll: true });
          };
          camera.eventCallback("onUpdate", updateCamera);
          // Anchor links into a pinned scene must select its timeline position.
          const chapterPosition = (hash: string) => {
            const index = chapters.findIndex((chapter) => `#${chapter.id}` === hash);
            const trigger = camera.scrollTrigger;
            if (index < 0 || !trigger) return null;
            return trigger.start + (trigger.end - trigger.start) * ((index * chapterDuration + chapterRest) / camera.duration());
          };
          const selectChapter = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
            if (!link) return;
            const top = link.hash === "#top" ? 0 : chapterPosition(link.hash);
            if (top === null) return;
            event.preventDefault();
            pendingFocus = null;
            if (event.detail === 0 && link.closest(".product-controls")) {
              const index = chapters.findIndex((chapter) => `#${chapter.id}` === link.hash);
              const target = chapters[index]?.querySelector<HTMLElement>("h3") ?? chapters[index];
              if (target) pendingFocus = { index, target, source: link };
            }
            // Keep address and Back navigation consistent with ordinary anchors.
            if (window.location.hash !== link.hash) window.history.pushState(null, "", link.hash);
            window.scrollTo({ top, behavior: "smooth" });
            updateCamera();
          };
          const cancelPendingFocus = () => { pendingFocus = null; restoreInitialChapter = false; };
          const cancelOnKey = (event: KeyboardEvent) => {
            if (["Tab", "Escape", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(event.key)) cancelPendingFocus();
          };
          const restoreChapter = () => {
            cancelPendingFocus();
            const top = window.location.hash === "#top" ? 0 : chapterPosition(window.location.hash);
            if (top !== null) window.scrollTo({ top, behavior: "instant" });
          };
          document.addEventListener("click", selectChapter);
          window.addEventListener("wheel", cancelPendingFocus, { passive: true });
          window.addEventListener("touchstart", cancelPendingFocus, { passive: true });
          window.addEventListener("pointerdown", cancelPendingFocus, { passive: true });
          window.addEventListener("keydown", cancelOnKey);
          window.addEventListener("hashchange", restoreChapter);
          window.addEventListener("popstate", restoreChapter);
          const restoreFrame = window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            // Native hash positioning can move during hydration as scenes stack.
            // Resolve the hash against the measured pin unless the visitor moved.
            if (restoreInitialChapter) restoreChapter();
          });
          // The listener belongs to this media-query lifecycle.
          return () => {
            window.cancelAnimationFrame(restoreFrame);
            pendingFocus = null;
            temporaryFocusTargets.forEach((tabIndex, target) => {
              if (tabIndex === null) target.removeAttribute("tabindex");
              else target.setAttribute("tabindex", tabIndex);
            });
            document.removeEventListener("click", selectChapter);
            window.removeEventListener("wheel", cancelPendingFocus);
            window.removeEventListener("touchstart", cancelPendingFocus);
            window.removeEventListener("pointerdown", cancelPendingFocus);
            window.removeEventListener("keydown", cancelOnKey);
            window.removeEventListener("hashchange", restoreChapter);
            window.removeEventListener("popstate", restoreChapter);
            steps.forEach((step) => step.classList.remove("is-active"));
            root.classList.remove("motion-ready", "product-camera", "cinematic-flight", "experience-camera");
          };
        }
        return () => {
          steps.forEach((step) => step.classList.remove("is-active"));
          root.classList.remove("motion-ready", "cinematic-flight", "experience-camera");
        };
      });
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".experience-route path", { strokeDashoffset: 300 }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".story-experience-section", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.from(".board-channel", { y: 18, opacity: .5, stagger: .1, ease: "power2.out", scrollTrigger: { trigger: ".community-board", start: "top 94%", end: "top 52%", scrub: .4 } });
        gsap.fromTo(".takeoff-route path", { strokeDasharray: 1400, strokeDashoffset: 1400 }, { strokeDashoffset: 0, scrollTrigger: { trigger: ".story-takeoff", start: "top 90%", end: "center center", scrub: .6 } });
      });
    }, root);
    let disposed = false;
    // Fonts can change heading dimensions after timelines have measured their pins.
    void document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => { disposed = true; sceneObserver?.disconnect(); progressTrigger?.kill(); media.revert(); context.revert(); controls.forEach((control) => control.removeAttribute("aria-current")); root.classList.remove("motion-ready", "product-camera", "cinematic-flight", "experience-camera"); };
  }, []);
  return <><div className="cinema-progress" aria-hidden="true" /><div className="custom-cursor" aria-hidden="true"><span className="cursor-dot"/><span className="cursor-label">OPEN</span></div></>;
}
