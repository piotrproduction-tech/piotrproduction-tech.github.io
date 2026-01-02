const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
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
// 1. access/accessMatrix.js — centralna mapa uprawnień
//
function accessMatrix() {
  const file = path.join(ACCESS, "accessMatrix.js");
  const marker = "// FE_FESTIVAL_ACCESS_MATRIX";

  const block = `
// FE_FESTIVAL_ACCESS_MATRIX
// Central access matrix for Festival Pavilion

export const FestivalAccessMatrix = {
  roles: {
    viewer: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    participant: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    creator: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    certifiedCreator: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    jury: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: true,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    admin: {
      canViewDashboard: true,
      canViewAwards: true,
      canViewSchedule: true,
      canVote: true,
      canAssignJury: true,
      canCreateAwards: true,
      canManageEvents: true
    }
  },

  // trust-level modifiers
  trust: {
    low: {
      canVote: false,
      canAssignJury: false,
      canCreateAwards: false,
      canManageEvents: false
    },
    medium: {},
    high: {}
  },

  // certification modifiers
  certifications: {
    "festival_badge": {
      canVote: true
    },
    "jury_certified": {
      canVote: true,
      canAssignJury: true
    },
    "creator_certified": {
      canCreateAwards: true
    }
  }
};
`;

  appendIfMissing(file, marker, block);
}

//
// 2. access/accessEvaluator.js — logika łączenia ról, trust, certyfikacji
//
function accessEvaluator() {
  const file = path.join(ACCESS, "accessEvaluator.js");
  const marker = "// FE_FESTIVAL_ACCESS_EVALUATOR";

  const block = `
// FE_FESTIVAL_ACCESS_EVALUATOR
// Evaluates final permissions for a user

import { FestivalAccessMatrix } from "./accessMatrix";

export function evaluateFestivalAccess(identity, governance, security) {
  const role = governance?.roles?.[0] || "viewer";
  const trust = security?.trustLevel || "medium";
  const certs = governance?.certifications || [];

  let base = { ...FestivalAccessMatrix.roles[role] };
  let trustMod = FestivalAccessMatrix.trust[trust] || {};
  let certMod = {};

  certs.forEach(c => {
    if (FestivalAccessMatrix.certifications[c]) {
      certMod = { ...certMod, ...FestivalAccessMatrix.certifications[c] };
    }
  });

  return {
    ...base,
    ...trustMod,
    ...certMod
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// 3. core/useFestivalAccess.js — hook Reactowy
//
function accessHook() {
  const file = path.join(CORE, "useFestivalAccess.js");
  const marker = "// FE_FESTIVAL_ACCESS_HOOK";

  const block = `
// FE_FESTIVAL_ACCESS_HOOK
// React hook for evaluating access in real time

import { useState, useEffect } from "react";
import { evaluateFestivalAccess } from "../access/accessEvaluator";

export function useFestivalAccess(identity, governance, security) {
  const [access, setAccess] = useState({});

  useEffect(() => {
    const a = evaluateFestivalAccess(identity, governance, security);
    setAccess(a);
  }, [identity, governance, security]);

  return access;
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
    path.join(FE01, "ADMIN", "AdminAwardsPanel.js"),
    path.join(FE01, "ADMIN", "AdminJuryPanel.js"),
    path.join(FE01, "ADMIN", "AdminSchedulePanel.js"),
    path.join(FE01, "JURY", "JuryPanel.js")
  ];

  const marker = "// FE_FESTIVAL_ACCESS_INTEGRATION";

  const block = `
// FE_FESTIVAL_ACCESS_INTEGRATION
import { useFestivalAccess } from "../core/useFestivalAccess";

const access = useFestivalAccess(identity, governance, security);

// Example UI guards:
if (!access.canViewDashboard && typeof hidePanel === "function") hidePanel();
if (!access.canVote && typeof disableVoting === "function") disableVoting();
if (!access.canAssignJury && typeof disableAssign === "function") disableAssign();
if (!access.canCreateAwards && typeof disableAwardCreation === "function") disableAwardCreation();
if (!access.canManageEvents && typeof disableEventManagement === "function") disableEventManagement();
`;

  for (const file of panels) {
    appendIfMissing(file, marker, block);
  }
}

//
// 5. Bootstrap folderu access/
//
function bootstrapFolder() {
  ensureDir(ACCESS);
}

function main() {
  console.log("=== Festival Pavilion FE Access Matrix Generator ===");

  bootstrapFolder();
  accessMatrix();
  accessEvaluator();
  accessHook();
  integratePanels();

  console.log("=== DONE ===");
}

main();
