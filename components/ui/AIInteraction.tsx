"use client";

import { useMemo, useState } from "react";

const commands = [
  { label: "SCAN PLANET", response: "Planetary scan complete. Biosphere detected. Surface energy activity: 87%." },
  { label: "SCAN CITY", response: "Civilization scan complete. 14 primary structures and 18 orbital drones detected." },
  { label: "ANALYZE WORMHOLE", response: "Wormhole stable. Dimensional transit window is open." },
];

export function AIInteraction() {
  const [activeCommand, setActiveCommand] = useState("SYSTEM READY");
  const [response, setResponse] = useState("Awaiting exploration command. AI navigation core is online.");

  const telemetry = useMemo(
    () => [
      ["SECTOR", "A-07 / UNKNOWN"],
      ["DIMENSION", "PRIME-Ω"],
      ["ENERGY", "87.4%"],
      ["SIGNAL", "STABLE"],
    ],
    [],
  );

  const runCommand = (label: string, nextResponse: string) => {
    setActiveCommand(label);
    setResponse(nextResponse);
  };

  return (
    <section className="ai-interface" aria-label="AI exploration interface">
      <div className="ai-topbar">
        <div className="ai-brand">
          <span className="ai-orb" />
          <div>
            <strong>PIYU // EXPLORATION AI</strong>
            <small>QUANTUM NAVIGATION CORE · ONLINE</small>
          </div>
        </div>
        <div className="ai-status"><span /> LINK STABLE</div>
      </div>

      <div className="ai-scan-card">
        <div className="ai-card-label">LIVE TELEMETRY</div>
        {telemetry.map(([key, value]) => (
          <div className="ai-metric" key={key}>
            <span>{key}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="ai-console">
        <div className="ai-console-header">
          <span>AI CONSOLE</span>
          <span className="ai-command">{activeCommand}</span>
        </div>
        <p>{response}</p>
        <div className="ai-actions">
          {commands.map((command) => (
            <button
              key={command.label}
              type="button"
              onClick={() => runCommand(command.label, command.response)}
            >
              {command.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ai-crosshair" aria-hidden="true"><span /><span /></div>
    </section>
  );
}
