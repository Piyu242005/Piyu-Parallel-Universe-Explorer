"use client";

import { useEffect, useMemo, useState } from "react";

type Sector = {
  id: string;
  code: string;
  name: string;
  position: [number, number, number];
  focus: [number, number, number];
  description: string;
  status: string;
};

const sectors: Sector[] = [
  { id: "space", code: "A-01", name: "DEEP SPACE", position: [0, 0, 18], focus: [0, 0, -10], description: "Primary navigation sector. Infinite stellar field and long-range survey zone.", status: "EXPLORED" },
  { id: "solar", code: "A-07", name: "SOLAR SYSTEM", position: [0, 1, 12], focus: [0, 0, -8], description: "Eight-planet system with active orbital bodies and stellar radiation.", status: "EXPLORED" },
  { id: "wormhole", code: "W-44", name: "WORMHOLE", position: [0, 1, 2], focus: [0, 0, -44], description: "High-energy dimensional gateway. Transit window currently stable.", status: "STABLE" },
  { id: "parallel", code: "P-61", name: "PARALLEL UNIVERSE", position: [0, 2, 3], focus: [0, 0, -60], description: "Alternate dimensional field containing divergent stellar structures.", status: "EXPLORED" },
  { id: "planet", code: "X-78", name: "ALIEN PLANET", position: [0, 2, 4], focus: [0, 0, -78], description: "Bioluminescent world with atmospheric particles and crystalline terrain.", status: "EXPLORED" },
  { id: "city", code: "C-82", name: "ALIEN CITY", position: [0, 3, 5], focus: [0, 0, -82], description: "Advanced civilization sector with energy beacons and orbital drones.", status: "SIGNAL DETECTED" },
];

export function ExplorationSystem() {
  const [selected, setSelected] = useState("space");
  const [message, setMessage] = useState("NAVIGATION CORE READY");

  const active = useMemo(() => sectors.find((sector) => sector.id === selected) ?? sectors[0], [selected]);

  const navigate = (sector: Sector) => {
    setSelected(sector.id);
    setMessage(`ROUTE LOCKED // ${sector.code}`);
    window.dispatchEvent(new CustomEvent("explorer:navigate", { detail: { position: sector.position, focus: sector.focus, id: sector.id } }));
  };

  useEffect(() => {
    const onNavigate = (event: Event) => {
      const detail = (event as CustomEvent<{ id?: string }>).detail;
      if (detail?.id) setSelected(detail.id);
    };
    window.addEventListener("explorer:navigate", onNavigate);
    return () => window.removeEventListener("explorer:navigate", onNavigate);
  }, []);

  return (
    <aside className="exploration-system" aria-label="Exploration navigation system">
      <div className="exploration-header">
        <div>
          <span className="exploration-kicker">EXPLORATION SYSTEM</span>
          <strong>SECTOR NAVIGATOR</strong>
        </div>
        <span className="exploration-live"><i /> LIVE</span>
      </div>

      <div className="exploration-map" aria-label="Discovered sectors">
        {sectors.map((sector) => (
          <button key={sector.id} type="button" className={sector.id === selected ? "active" : ""} onClick={() => navigate(sector)}>
            <span className="sector-dot" />
            <span><b>{sector.code}</b>{sector.name}</span>
          </button>
        ))}
      </div>

      <div className="exploration-detail">
        <div className="exploration-detail-top"><span>{active.code}</span><em>{active.status}</em></div>
        <h2>{active.name}</h2>
        <p>{active.description}</p>
        <div className="exploration-coords"><span>VECTOR</span><strong>{active.focus.map((value) => value.toFixed(1)).join(" / ")}</strong></div>
        <button type="button" className="exploration-enter" onClick={() => navigate(active)}>ENTER SECTOR <span>↗</span></button>
      </div>

      <div className="exploration-footer"><span>{message}</span><span>{sectors.length}/6 DISCOVERED</span></div>
    </aside>
  );
}
