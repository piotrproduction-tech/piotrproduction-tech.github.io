const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const COMPONENTS = path.join(FE01, "components");
const CORE = path.join(FE01, "core");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(filePath, baseContent = "") {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, baseContent, "utf8");
    console.log("[CREATE]", filePath);
  }
}

function appendIfMissing(filePath, marker, block) {
  ensureFile(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", filePath, "→ added:", marker);
  } else {
    console.log("[SKIP]", filePath, "already has:", marker);
  }
}

//
// 1. components/FestivalHUD.js — główny komponent HUD
//
function hudComponent() {
  const file = path.join(COMPONENTS, "FestivalHUD.js");
  const marker = "// FE_FESTIVAL_HUD_COMPONENT";

  const block = `
// FE_FESTIVAL_HUD_COMPONENT
// Live HUD for Festival Pavilion — pulse, mood, wave, reputation, identity, access

import React from "react";
import "./FestivalHUD.css";

export function FestivalHUD({ pulse, mood, wave, reputation, identity, access }) {
  const avatar = identity?.avatar || "/default-avatar.png";
  const name = identity?.profile?.name || "Unknown";
  const badges = identity?.badges || [];
  const level = reputation?.level || 0;
  const trust = reputation?.trustLevel || "medium";

  return (
    <div className={"festival-hud mood-" + mood}>
      <div className="hud-left">
        <img className="hud-avatar" src={avatar} alt="avatar" />
        <div className="hud-user">
          <div className="hud-name">{name}</div>
          <div className="hud-badges">
            {badges.map((b) => (
              <span key={b} className="hud-badge">{b}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="hud-center">
        <div className="hud-item">Pulse: {pulse} BPM</div>
        <div className="hud-item">Mood: {mood}</div>
        <div className="hud-item">Wave: {wave?.label || "—"}</div>
        <div className="hud-item">Reputation: {reputation?.points || 0}</div>
        <div className="hud-item">Level: {level}</div>
      </div>

      <div className="hud-right">
        <div className="hud-access">
          <pre>{JSON.stringify(access, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. components/FestivalHUD.css — style HUD
//
function hudCSS() {
  const file = path.join(COMPONENTS, "FestivalHUD.css");
  const marker = "/* FE_FESTIVAL_HUD_CSS */";

  const block = `
/* FE_FESTIVAL_HUD_CSS */

.festival-hud {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
}

.hud-left {
  display: flex;
  gap: 12px;
  align-items: center;
}

.hud-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.hud-user {
  display: flex;
  flex-direction: column;
}

.hud-name {
  font-size: 16px;
  font-weight: bold;
}

.hud-badge {
  display: inline-block;
  padding: 2px 6px;
  margin-right: 4px;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  font-size: 12px;
}

.hud-center {
  display: flex;
  gap: 16px;
}

.hud-item {
  opacity: 0.9;
}

.hud-right {
  max-width: 200px;
  overflow: hidden;
}

.mood-Calm { background: rgba(100,150,255,0.1); }
.mood-Energetic { background: rgba(255,120,80,0.1); }
.mood-Creative { background: rgba(255,200,80,0.1); }
.mood-Tense { background: rgba(255,80,80,0.1); }
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalHUD.js — hook łączący wszystkie silniki
//
function hudHook() {
  const file = path.join(CORE, "useFestivalHUD.js");
  const marker = "// FE_FESTIVAL_HUD_HOOK";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

//
// 4. Integracja z panelami FE
//
function integratePanels() {
  const panels = [
    path.join(FE01, "ADMIN", "AdminDashboard.js"),
    path.join(FE01, "JURY", "JuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminAwardsPanel.js"),
    path.join(FE01, "ADMIN", "AdminSchedulePanel.js"),
    path.join(FE01, "ANALYTICS", "FestivalCharts.js")
  ];

  const marker = "// FE_FESTIVAL_HUD_INTEGRATION";

  const block = `
// FE_FESTIVAL_HUD_INTEGRATION
import { FestivalHUD } from "../components/FestivalHUD";
import { useFestivalHUD } from "../core/useFestivalHUD";

const hud = useFestivalHUD(identity, governance, security);

// Example usage inside render:
// <FestivalHUD {...hud} />
`;

  for (const file of panels) {
    appendIfMissing(file, marker, block);
  }
}

//
// 5. Bootstrap folderu components/
//
function bootstrapFolders() {
  ensureDir(COMPONENTS);
}

function main() {
  console.log("=== Festival Pavilion FE FestivalHUD Generator ===");

  bootstrapFolders();
  hudComponent();
  hudCSS();
  hudHook();
  integratePanels();

  console.log("=== DONE ===");
}

main();
