


// FE_FESTIVAL_HUD_HOOK
// Combines pulse + mood + wave + reputation + identity + access into HUD data

import { useFestivalPulseMoodLive } from "./useFestivalPulseMoodLive";
import { useFestivalSimulationLive } from "./useFestivalSimulationLive";
import { useFestivalReputationLive } from "./useFestivalReputationLive";
import { useFestivalIdentityLive } from "./useFestivalIdentityLive";
import { useFestivalAccess } from "./useFestivalAccess";

import { useState } from "react";

export function useFestivalHUD(identity, governance, security) {
  const [pulse, setPulse] = useState(0);
  const [mood, setMood] = useState("Calm");
  const [wave, setWave] = useState(null);
  const [pattern, setPattern] = useState(null);
  const [reputation, setReputation] = useState({});
  const [identityLive, setIdentityLive] = useState(identity);

  // Pulse + Mood
  useFestivalPulseMoodLive(
    (bpm) => setPulse(bpm),
    (m) => setMood(m)
  );

  // Simulation waves
  useFestivalSimulationLive(
    (w) => setWave(w),
    (p) => setPattern(p)
  );

  // Reputation
  useFestivalReputationLive((rep) => setReputation(rep));

  // Identity
  useFestivalIdentityLive((id) => setIdentityLive(id));

  // Access
  const access = useFestivalAccess(identityLive, governance, security);

  return {
    pulse,
    mood,
    wave,
    reputation,
    identity: identityLive,
    access
  };
}
