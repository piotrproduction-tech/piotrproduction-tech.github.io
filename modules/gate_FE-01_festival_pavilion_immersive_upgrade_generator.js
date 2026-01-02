const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function appendIfMissing(filePath, marker, block) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", filePath, "→ added:", marker);
  } else {
    console.log("[SKIP]", filePath, "already has:", marker);
  }
}

function upgradeAdminDashboard() {
  const file = path.join(FE01, "ADMIN", "AdminDashboard.js");
  const marker = "// IMMERSIVE_DASHBOARD_UPGRADE";

  const block = `
// IMMERSIVE_DASHBOARD_UPGRADE
// LivePulse, MoodBadge, AI Predictions, LiveEventFeed, NarrativeHighlights, Charts, Heatmap

import FestivalCharts from "../ANALYTICS/FestivalCharts";
import FestivalHeatmap from "../ANALYTICS/FestivalHeatmap";
import FestivalAIPredictions from "../AI/FestivalAIPredictions";
import { getFestivalStats, getFestivalEvents, getFestivalNarrative, getFestivalAIPredictions } from "../api";

export function useImmersiveDashboard(setStats, setEvents, setStories, setAI, setPulse, setMood) {
  async function load() {
    try {
      const [s, ev, st, aiData] = await Promise.all([
        getFestivalStats(),
        getFestivalEvents(),
        getFestivalNarrative(),
        getFestivalAIPredictions()
      ]);
      setStats(s || {});
      setEvents(ev || []);
      setStories(st || []);
      setAI(aiData || { hotCategories: [], potentialWinners: [] });
      if (s?.pulseBpm) setPulse(s.pulseBpm);
      if (s?.mood) setMood(s.mood);
    } catch (e) {
      console.warn("ImmersiveDashboard load error", e);
    }
  }
  return load;
}
`;

  appendIfMissing(file, marker, block);
}

function upgradeAdminAwardsPanel() {
  const file = path.join(FE01, "ADMIN", "AdminAwardsPanel.js");
  const marker = "// IMMERSIVE_AWARDS_UPGRADE";

  const block = `
// IMMERSIVE_AWARDS_UPGRADE
// Real award workflow, API integration, UI logic

import { getAwardCategories, createAwardCategory, grantAward, getFestivalSubmissions } from "../api";

export function useImmersiveAwards(setCategories, setSubmissions) {
  async function load() {
    try {
      const [cats, subs] = await Promise.all([
        getAwardCategories(),
        getFestivalSubmissions()
      ]);
      setCategories(cats || []);
      setSubmissions(subs || []);
    } catch (e) {
      console.warn("ImmersiveAwards load error", e);
    }
  }
  return load;
}
`;

  appendIfMissing(file, marker, block);
}

function upgradeAdminJuryPanel() {
  const file = path.join(FE01, "ADMIN", "AdminJuryPanel.js");
  const marker = "// IMMERSIVE_JURY_UPGRADE";

  const block = `
// IMMERSIVE_JURY_UPGRADE
// Jury assignment logic, API integration, live updates

import { getJuryMembers, getFestivalSubmissions, assignSubmissionToJury, getJuryAssignments } from "../api";

export function useImmersiveJury(setJury, setSubmissions, setAssignments) {
  async function load() {
    try {
      const [j, s, a] = await Promise.all([
        getJuryMembers(),
        getFestivalSubmissions(),
        getJuryAssignments()
      ]);
      setJury(j || []);
      setSubmissions(s || []);
      setAssignments(a || []);
    } catch (e) {
      console.warn("ImmersiveJury load error", e);
    }
  }
  return load;
}
`;

  appendIfMissing(file, marker, block);
}

function upgradeAdminSchedulePanel() {
  const file = path.join(FE01, "ADMIN", "AdminSchedulePanel.js");
  const marker = "// IMMERSIVE_SCHEDULE_UPGRADE";

  const block = `
// IMMERSIVE_SCHEDULE_UPGRADE
// Event creation, schedule management, API integration

import { getFestivalEvents, createFestivalEvent, updateFestivalEvent, getFestivalSchedule, addToFestivalSchedule } from "../api";

export function useImmersiveSchedule(setEvents, setSchedule) {
  async function load() {
    try {
      const [ev, sch] = await Promise.all([
        getFestivalEvents(),
        getFestivalSchedule()
      ]);
      setEvents(ev || []);
      setSchedule(sch || []);
    } catch (e) {
      console.warn("ImmersiveSchedule load error", e);
    }
  }
  return load;
}
`;

  appendIfMissing(file, marker, block);
}

function upgradeFestivalCharts() {
  const file = path.join(FE01, "ANALYTICS", "FestivalCharts.js");
  const marker = "// IMMERSIVE_CHARTS_UPGRADE";

  const block = `
// IMMERSIVE_CHARTS_UPGRADE
// Timeline charts, animated bars, API integration

import { getFestivalStatsTimeline } from "../api";

export function useImmersiveCharts(setTimeline) {
  async function load() {
    try {
      const t = await getFestivalStatsTimeline();
      setTimeline(t || []);
    } catch (e) {
      console.warn("ImmersiveCharts error", e);
    }
  }
  return load;
}
`;

  appendIfMissing(file, marker, block);
}

function upgradeFestivalHeatmap() {
  const file = path.join(FE01, "ANALYTICS", "FestivalHeatmap.js");
  const marker = "// IMMERSIVE_HEATMAP_UPGRADE";

  const block = `
// IMMERSIVE_HEATMAP_UPGRADE
// Heatmap integration with backend, animated cells

import { getFestivalHeatmap } from "../api";

export function useImmersiveHeatmap(setHeat) {
  async function load() {
    try {
      const h = await getFestivalHeatmap();
      setHeat(h || { submissions: [], jury: [], awards: [] });
    } catch (e) {
      console.warn("ImmersiveHeatmap error", e);
    }
  }
  return load;
}
`;

  appendIfMissing(file, marker, block);
}

function upgradeJuryPanel() {
  const file = path.join(FE01, "JURY", "JuryPanel.js");
  const marker = "// IMMERSIVE_JURY_PANEL_UPGRADE";

  const block = `
// IMMERSIVE_JURY_PANEL_UPGRADE
// Jury voting, submission details, API integration

import { getJuryAssignmentsForCurrent, getSubmissionDetails, submitJuryVote } from "../api";

export function useImmersiveJuryPanel(setAssignments, setDetails, selected) {
  async function loadAssignments() {
    try {
      const a = await getJuryAssignmentsForCurrent();
      setAssignments(a || []);
    } catch (e) {
      console.warn("ImmersiveJuryPanel loadAssignments error", e);
    }
  }

  async function loadDetails() {
    if (!selected) {
      setDetails(null);
      return;
    }
    try {
      const d = await getSubmissionDetails(selected.submissionId);
      setDetails(d || null);
    } catch (e) {
      console.warn("ImmersiveJuryPanel loadDetails error", e);
    }
  }

  return { loadAssignments, loadDetails };
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion Immersive Upgrade Pack ===");

  upgradeAdminDashboard();
  upgradeAdminAwardsPanel();
  upgradeAdminJuryPanel();
  upgradeAdminSchedulePanel();
  upgradeFestivalCharts();
  upgradeFestivalHeatmap();
  upgradeJuryPanel();

  console.log("=== DONE ===");
}

main();
