


// FE_FESTIVAL_DEBUG_CONSOLE_HOOK
// Collects live logs from all engines for FestivalDebugConsole

import { useState } from "react";
import { useFestivalPulseMoodLive } from "./useFestivalPulseMoodLive";
import { useFestivalSimulationLive } from "./useFestivalSimulationLive";
import { useFestivalReputationLive } from "./useFestivalReputationLive";
import { useFestivalGovernanceLive } from "./useFestivalGovernanceLive";
import { useFestivalSecurityLive } from "./useFestivalSecurityLive";
import { useFestivalIdentityLive } from "./useFestivalIdentityLive";
import { useFestivalEconomyLive } from "./useFestivalEconomyLive";

function now() {
  return new Date().toISOString().split("T")[1].slice(0, 8);
}

export function useFestivalDebugConsole() {
  const [logs, setLogs] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  function push(source, message, payload) {
    setLogs((prev) => [
      {
        time: now(),
        source,
        message,
        payload
      },
      ...prev
    ].slice(0, 200));
  }

  // Pulse + Mood
  useFestivalPulseMoodLive(
    (bpm) => push("pulse", "Pulse update: " + bpm, { bpm }),
    (mood) => push("mood", "Mood update: " + mood, { mood })
  );

  // Simulation + Emergence
  useFestivalSimulationLive(
    (wave) => push("simulation", "Wave: " + (wave?.label || "?"), wave),
    (pattern) => push("simulation", "Pattern: " + (pattern?.type || "?"), pattern)
  );

  // Reputation
  useFestivalReputationLive((rep) =>
    push("reputation", "Reputation update for " + rep.userId, rep)
  );

  // Governance
  useFestivalGovernanceLive((gov) =>
    push("governance", "Governance update for " + gov.userId, gov)
  );

  // Security
  useFestivalSecurityLive((sec) =>
    push("security", "Security update for " + sec.userId, sec)
  );

  // Identity
  useFestivalIdentityLive((id) =>
    push("identity", "Identity update for " + id.userId, id)
  );

  // Economy
  useFestivalEconomyLive((eco) =>
    push("economy", "Economy update for " + eco.userId, eco)
  );

  function toggle() {
    setCollapsed((c) => !c);
  }

  return {
    logs,
    collapsed,
    toggle
  };
}
