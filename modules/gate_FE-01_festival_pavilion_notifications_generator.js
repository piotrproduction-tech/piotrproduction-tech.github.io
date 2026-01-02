const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const COMPONENTS = path.join(FE01, "components");
const CORE = path.join(FE01, "core");
const LIVE = path.join(FE01, "live");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(file, base = "") {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, base, "utf8");
    console.log("[CREATE]", file);
  }
}

function appendIfMissing(file, marker, block) {
  ensureFile(file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(file, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", file, "→", marker);
  }
}

//
// 1. components/FestivalNotifications.js
//
function notificationsComponent() {
  const file = path.join(COMPONENTS, "FestivalNotifications.js");
  const marker = "// FE_FESTIVAL_NOTIFICATIONS_COMPONENT";

  const block = `
// FE_FESTIVAL_NOTIFICATIONS_COMPONENT
import React from "react";
import "./FestivalNotifications.css";

export function FestivalNotifications({ notifications }) {
  return (
    <div className="festival-notifications">
      {notifications.map((n, i) => (
        <div key={i} className={"notif notif-" + n.type}>
          <div className="notif-title">{n.title}</div>
          <div className="notif-body">{n.message}</div>
        </div>
      ))}
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalNotifications.css
//
function notificationsCSS() {
  const file = path.join(COMPONENTS, "FestivalNotifications.css");
  const marker = "/* FE_FESTIVAL_NOTIFICATIONS_CSS */";

  const block = `
/* FE_FESTIVAL_NOTIFICATIONS_CSS */
.festival-notifications {
  position: fixed;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 9998;
}

.notif {
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  max-width: 280px;
  animation: fadeIn 0.3s ease-out;
}

.notif-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.notif-narrative { border-left: 4px solid #ffd27f; }
.notif-reputation { border-left: 4px solid #7fff9f; }
.notif-governance { border-left: 4px solid #ffb27f; }
.notif-security { border-left: 4px solid #ff7fb2; }
.notif-identity { border-left: 4px solid #7fffff; }
.notif-economy { border-left: 4px solid #fff27f; }
.notif-simulation { border-left: 4px solid #b27fff; }
.notif-pulse { border-left: 4px solid #ff7f7f; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalNotifications.js
//
function notificationsHook() {
  const file = path.join(CORE, "useFestivalNotifications.js");
  const marker = "// FE_FESTIVAL_NOTIFICATIONS_HOOK";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z panelami
//
function integratePanels() {
  const panels = [
    path.join(FE01, "ADMIN", "AdminDashboard.js"),
    path.join(FE01, "JURY", "JuryPanel.js"),
    path.join(FE01, "ANALYTICS", "FestivalCharts.js")
  ];

  const marker = "// FE_FESTIVAL_NOTIFICATIONS_INTEGRATION";

  const block = `
// FE_FESTIVAL_NOTIFICATIONS_INTEGRATION
import { FestivalNotifications } from "../components/FestivalNotifications";
import { useFestivalNotifications } from "../core/useFestivalNotifications";

const notifications = useFestivalNotifications();

// Example usage inside render:
// <FestivalNotifications notifications={notifications} />
`;

  for (const file of panels) appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalNotifications Generator ===");
  ensureDir(COMPONENTS);
  notificationsComponent();
  notificationsCSS();
  notificationsHook();
  integratePanels();
  console.log("=== DONE ===");
}

main();
