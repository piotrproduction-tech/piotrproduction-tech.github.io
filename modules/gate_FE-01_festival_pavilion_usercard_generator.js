const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const COMPONENTS = path.join(FE01, "components");
const CORE = path.join(FE01, "core");
const ACCESS = path.join(FE01, "access");

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
// 1. components/UserCard.js — główny komponent
//
function userCardComponent() {
  const file = path.join(COMPONENTS, "UserCard.js");
  const marker = "// FE_FESTIVAL_USERCARD_COMPONENT";

  const block = `
// FE_FESTIVAL_USERCARD_COMPONENT
// Live identity + badges + access widget

import React from "react";

export function UserCard({ identity, governance, security, access }) {
  if (!identity) return null;

  const avatar = identity.avatar || "/default-avatar.png";
  const name = identity.profile?.name || "Unknown User";
  const handle = identity.profile?.handle || "";
  const badges = identity.badges || [];
  const roles = governance?.roles || [];
  const trust = security?.trustLevel || "medium";

  return (
    <div className="usercard">
      <div className="usercard-avatar">
        <img src={avatar} alt="avatar" />
      </div>

      <div className="usercard-info">
        <div className="usercard-name">{name}</div>
        <div className="usercard-handle">@{handle}</div>

        <div className="usercard-roles">
          {roles.map((r) => (
            <span key={r} className="usercard-role">{r}</span>
          ))}
        </div>

        <div className="usercard-badges">
          {badges.map((b) => (
            <span key={b} className="usercard-badge">{b}</span>
          ))}
        </div>

        <div className="usercard-trust trust-" + {trust}>
          Trust: {trust}
        </div>

        <div className="usercard-access">
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
// 2. components/UserCard.css — style (minimalne)
//
function userCardCSS() {
  const file = path.join(COMPONENTS, "UserCard.css");
  const marker = "/* FE_FESTIVAL_USERCARD_CSS */";

  const block = `
/* FE_FESTIVAL_USERCARD_CSS */

.usercard {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
}

.usercard-avatar img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.usercard-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.usercard-name {
  font-size: 18px;
  font-weight: bold;
}

.usercard-handle {
  opacity: 0.7;
}

.usercard-role,
.usercard-badge {
  display: inline-block;
  padding: 2px 6px;
  margin-right: 4px;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  font-size: 12px;
}

.usercard-trust {
  margin-top: 4px;
  font-size: 12px;
  opacity: 0.8;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useUserCardData.js — hook łączący identity + governance + security + access
//
function userCardDataHook() {
  const file = path.join(CORE, "useUserCardData.js");
  const marker = "// FE_FESTIVAL_USERCARD_DATA_HOOK";

  const block = `
// FE_FESTIVAL_USERCARD_DATA_HOOK
// Combines identity + governance + security + access into one object

import { useFestivalAccess } from "./useFestivalAccess";

export function useUserCardData(identity, governance, security) {
  const access = useFestivalAccess(identity, governance, security);

  return {
    identity,
    governance,
    security,
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
    path.join(FE01, "ADMIN", "AdminJuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminSchedulePanel.js")
  ];

  const marker = "// FE_FESTIVAL_USERCARD_INTEGRATION";

  const block = `
// FE_FESTIVAL_USERCARD_INTEGRATION
import { UserCard } from "../components/UserCard";
import { useUserCardData } from "../core/useUserCardData";

const usercard = useUserCardData(identity, governance, security);

// Example usage inside panel render:
// <UserCard {...usercard} />
`;

  for (const file of panels) {
    appendIfMissing(file, marker, block);
  }
}

//
// 5. Bootstrap folderu components/
//
function bootstrapFolder() {
  ensureDir(COMPONENTS);
}

function main() {
  console.log("=== Festival Pavilion FE UserCard / IdentityWidget Generator ===");

  bootstrapFolder();
  userCardComponent();
  userCardCSS();
  userCardDataHook();
  integratePanels();

  console.log("=== DONE ===");
}

main();
