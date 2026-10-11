"use client";

import { useState } from "react";
import { Icon } from "./icon";

const tabs = ["Forms", "Flights", "Logbook"] as const;
type Tab = typeof tabs[number];
const content: Record<Tab, { title: string; status: string; detail: string; progress: number }[]> = {
  Forms: [
    { title: "CAAP Flight Plan", status: "Completed", detail: "ATS 2019-1 · Signed and ready", progress: 100 },
    { title: "Passenger Manifest", status: "Draft", detail: "Flight documentation", progress: 72 },
    { title: "Pre-flight Checklist", status: "Completed", detail: "Preparation, organized", progress: 100 },
  ],
  Flights: [
    { title: "Manila → Cebu", status: "Planned", detail: "RPLL → RPVM · Sample route", progress: 100 },
    { title: "Flight preparation", status: "Draft", detail: "Route, fuel, and documentation", progress: 65 },
    { title: "Aircraft information", status: "Ready", detail: "Your fleet, in one place", progress: 100 },
  ],
  Logbook: [
    { title: "Pilot Flight Logbook", status: "Saved", detail: "Flight time and experience", progress: 100 },
    { title: "Aircraft Flight Logbook", status: "Saved", detail: "Aircraft flight records", progress: 100 },
    { title: "Digital signature", status: "Ready", detail: "Sign your records in the app", progress: 100 },
  ],
};

export function ProductPreview() {
  const [active, setActive] = useState<Tab>("Forms");
  return <div className="product-stage">
    <svg className="route-art" viewBox="0 0 600 640" fill="none" aria-hidden="true">
      <circle className="orbit-outer" cx="300" cy="320" r="256" /><circle className="orbit-inner" cx="300" cy="320" r="186" />
      <path className="flight-route" d="M35 510C490 625 130 34 570 158" strokeDasharray="5 9" />
      <g className="route-plane"><path d="m-12-9 25 9-25 9 5-9Z" fill="#5145ef" stroke="#5145ef" /></g>
      <circle cx="70" cy="510" r="5" fill="currentColor" /><circle cx="540" cy="155" r="5" fill="currentColor" />
    </svg>
    <span className="coordinate coordinate-top">14°35′ N / 120°59′ E</span>
    <span className="coordinate coordinate-bottom">DESIGNED FOR YOUR NEXT DEPARTURE</span>
    <div className="floating-note"><span className="note-icon"><Icon name="cloud" size={19} /></span><div><strong>Ready, even offline.</strong><small>Saved forms stay with you.</small></div></div>
    <div className="stage-glow" aria-hidden="true" />
    <div className="phone">
      <div className="phone-status"><span>09:41</span><span className="phone-island" /><span>▮▮▮ ▰</span></div>
      <div className="phone-heading"><div><small>YOUR DIGITAL FLIGHT DECK</small><h3>{active}</h3></div><span className="avatar">PF</span></div>
      <div className="phone-stats"><div><strong>03</strong><span>Documents</span></div><div><strong>02</strong><span>Completed</span></div><div><strong>01</strong><span>In progress</span></div></div>
      <div className="preview-tabs" role="tablist" aria-label="Explore the app preview">{tabs.map((tab) => <button key={tab} id={`tab-${tab}`} role="tab" type="button" aria-selected={active === tab} aria-controls="preview-panel" onClick={() => setActive(tab)}>{tab}</button>)}</div>
      <div id="preview-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="preview-panel">{content[active].map((item, index) => <div className="phone-card" key={`${active}-${item.title}`} style={{ "--card-delay": `${index * 85}ms` } as React.CSSProperties}>
        <div className="phone-card-title"><span className="document-icon"><Icon name={active === "Flights" ? "plane" : active === "Logbook" ? "book" : "forms"} size={17} /></span><strong>{item.title}</strong><span className={item.progress === 100 ? "complete-badge" : "draft-badge"}>{item.status}</span></div>
        <p>{item.detail}</p><div className="mini-progress"><span style={{ width: `${item.progress}%` }} /></div>
      </div>)}</div>
      <div className="phone-bottom">{["forms", "plane", "compass", "chat"].map((icon) => <Icon key={icon} name={icon} size={21} />)}</div>
      <div className="phone-home" />
    </div>
    <div className="floating-ready"><span className="ready-check"><Icon name="check" size={18} /></span><div><small>ONE APP. YOUR WORKFLOW.</small><strong>From preparation to records.</strong></div></div>
    <span className="preview-disclaimer">Interactive product illustration</span>
  </div>;
}
