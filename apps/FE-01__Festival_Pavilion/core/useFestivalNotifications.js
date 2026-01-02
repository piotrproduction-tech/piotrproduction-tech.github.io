


// FE_FESTIVAL_NOTIFICATIONS_HOOK
import { useState } from "react";
import { useFestivalPulseMoodLive } from "./useFestivalPulseMoodLive";
import { useFestivalSimulationLive } from "./useFestivalSimulationLive";
import { useFestivalReputationLive } from "./useFestivalReputationLive";
import { useFestivalGovernanceLive } from "./useFestivalGovernanceLive";
import { useFestivalSecurityLive } from "./useFestivalSecurityLive";
import { useFestivalIdentityLive } from "./useFestivalIdentityLive";
import { useFestivalEconomyLive } from "./useFestivalEconomyLive";

export function useFestivalNotifications() {
  const [notifications, setNotifications] = useState([]);

  function push(type, title, message) {
    setNotifications((prev) => [
      { type, title, message },
      ...prev.slice(0, 20)
    ]);
  }

  useFestivalPulseMoodLive(
    (bpm) => push("pulse", "Pulse Update", "City BPM: " + bpm),
    (mood) => push("pulse", "Mood Shift", "City mood is now: " + mood)
  );

  useFestivalSimulationLive(
    (wave) => push("simulation", "Activity Wave", wave.label || "Unknown wave"),
    (pattern) => push("simulation", "Emergent Pattern", pattern.type)
  );

  useFestivalReputationLive((rep) =>
    push("reputation", "Reputation Update", "User " + rep.userId + " changed reputation")
  );

  useFestivalGovernanceLive((gov) =>
    push("governance", "Governance Update", "Roles updated for " + gov.userId)
  );

  useFestivalSecurityLive((sec) =>
    push("security", "Security Alert", "Trust level: " + sec.trustLevel)
  );

  useFestivalIdentityLive((id) =>
    push("identity", "Identity Update", "Profile updated for " + id.userId)
  );

  useFestivalEconomyLive((eco) =>
    push("economy", "Transaction", eco.delta + " tokens (" + eco.reason + ")")
  );

  return notifications;
}
