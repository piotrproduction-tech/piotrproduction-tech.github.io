const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const BACKEND = path.join(ROOT, "backend");

const FE01 = path.join(APPS, "FE-01__Festival_Pavilion");
const BE01 = path.join(BACKEND, "BE-01__Festival_Pavilion");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("[DIR] created:", dir);
  }
}

function ensureFile(filePath, defaultContent) {
  const dir = path.dirname(filePath);
  ensureDir(dir);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent, "utf8");
    console.log("[FILE] created:", filePath);
  } else {
    console.log("[SKIP] file exists:", filePath);
  }
}

function appendIfMissing(filePath, marker, block) {
  const content = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n" + block, "utf8");
    console.log("[INTEGRATION] added:", marker);
  } else {
    console.log("[SKIP] already integrated:", marker);
  }
}

function main() {
  console.log("=== Festival Pavilion Completion Pack generator start ===");

  if (!fs.existsSync(FE01)) {
    console.error("[ERROR] FE-01__Festival_Pavilion not found at:", FE01);
    process.exit(1);
  }
  if (!fs.existsSync(BE01)) {
    console.error("[ERROR] BE-01__Festival_Pavilion not found at:", BE01);
    process.exit(1);
  }

  //
  // BACKEND COMPLETION
  //
  const beWorkflowDir = path.join(BE01, "workflow");
  ensureDir(beWorkflowDir);

  // BACKEND WORKFLOW FILES
  ensureFile(
    path.join(beWorkflowDir, "submissions.js"),
    `export const festivalSubmissionsWorkflow = {
  createSubmission(payload) {
    // TODO: validate, normalize, persist
    return {
      ...payload,
      status: "submitted",
      createdAt: Date.now()
    };
  },
  updateStatus(submission, status) {
    return { ...submission, status, updatedAt: Date.now() };
  }
};`
  );

  ensureFile(
    path.join(beWorkflowDir, "jury.js"),
    `export const festivalJuryWorkflow = {
  assignToJury(submissionId, juryId) {
    return {
      submissionId,
      juryId,
      assignedAt: Date.now()
    };
  },
  recordVote(submissionId, juryId, score, comment) {
    return {
      submissionId,
      juryId,
      score,
      comment,
      votedAt: Date.now()
    };
  }
};`
  );

  ensureFile(
    path.join(beWorkflowDir, "awards.js"),
    `export const festivalAwardsWorkflow = {
  createAwardCategory(name, description) {
    return {
      id: "award_" + Date.now(),
      name,
      description,
      createdAt: Date.now()
    };
  },
  grantAward(categoryId, submissionId) {
    return {
      categoryId,
      submissionId,
      grantedAt: Date.now()
    };
  }
};`
  );

  ensureFile(
    path.join(beWorkflowDir, "events.js"),
    `export const festivalEventsWorkflow = {
  createEvent(name, startsAt, endsAt) {
    return {
      id: "event_" + Date.now(),
      name,
      startsAt,
      endsAt
    };
  },
  updateEvent(event, patch) {
    return { ...event, ...patch, updatedAt: Date.now() };
  }
};`
  );

  ensureFile(
    path.join(beWorkflowDir, "schedule.js"),
    `export const festivalScheduleWorkflow = {
  addToSchedule(eventId, slot) {
    return {
      eventId,
      slot,
      addedAt: Date.now()
    };
  }
};`
  );

  ensureFile(
    path.join(beWorkflowDir, "reviews.js"),
    `export const festivalReviewsWorkflow = {
  addReview(submissionId, reviewerId, score, comment) {
    return {
      submissionId,
      reviewerId,
      score,
      comment,
      createdAt: Date.now()
    };
  }
};`
  );

  // BACKEND LIFE / SYNC / NARRATION
  const beLifeDir = path.join(BE01, "life");
  ensureDir(beLifeDir);

  ensureFile(
    path.join(beLifeDir, "festivalSync.js"),
    `import { festivalSubmissionsWorkflow } from "../workflow/submissions";
import { festivalJuryWorkflow } from "../workflow/jury";
import { festivalAwardsWorkflow } from "../workflow/awards";

export const festivalSync = {
  handleSubmissionCreated(payload) {
    return festivalSubmissionsWorkflow.createSubmission(payload);
  },
  handleJuryVote(payload) {
    return festivalJuryWorkflow.recordVote(
      payload.submissionId,
      payload.juryId,
      payload.score,
      payload.comment
    );
  },
  handleAwardGranted(payload) {
    return festivalAwardsWorkflow.grantAward(
      payload.categoryId,
      payload.submissionId
    );
  }
};`
  );

  ensureFile(
    path.join(beLifeDir, "jurySync.js"),
    `import { festivalJuryWorkflow } from "../workflow/jury";

export const jurySync = {
  assign(submissionId, juryId) {
    return festivalJuryWorkflow.assignToJury(submissionId, juryId);
  }
};`
  );

  ensureFile(
    path.join(beLifeDir, "submissionsSync.js"),
    `import { festivalSubmissionsWorkflow } from "../workflow/submissions";

export const submissionsSync = {
  submit(payload) {
    return festivalSubmissionsWorkflow.createSubmission(payload);
  },
  updateStatus(submission, status) {
    return festivalSubmissionsWorkflow.updateStatus(submission, status);
  }
};`
  );

  ensureFile(
    path.join(beLifeDir, "workflowSync.js"),
    `import { festivalEventsWorkflow } from "../workflow/events";
import { festivalScheduleWorkflow } from "../workflow/schedule";

export const festivalWorkflowSync = {
  createEvent(name, startsAt, endsAt) {
    return festivalEventsWorkflow.createEvent(name, startsAt, endsAt);
  },
  schedule(eventId, slot) {
    return festivalScheduleWorkflow.addToSchedule(eventId, slot);
  }
};`
  );

  ensureFile(
    path.join(beLifeDir, "narration.js"),
    `import { cityNarrative } from "../../apps/FE-00__City/narrative/cityNarrativeEngine";

export const festivalNarration = {
  recordSubmissionStory(submission) {
    cityNarrative.stories.push({
      text: \`Nowe zgłoszenie festiwalowe: \${submission.title || submission.id}.\`,
      timestamp: Date.now()
    });
  },
  recordAwardStory(award) {
    cityNarrative.stories.push({
      text: \`Przyznano nagrodę w kategorii \${award.categoryId}.\`,
      timestamp: Date.now()
    });
  }
};`
  );

  // BACKEND EVENTS EXTENSION
  const beEventsFile = path.join(BE01, "events", "emitters.js");
  appendIfMissing(
    beEventsFile,
    "festival.submission.created",
    `
// Festival Pavilion events
export function emitFestivalSubmissionCreated(submission) {
  return {
    type: "festival.submission.created",
    payload: submission
  };
}

export function emitFestivalJuryVote(vote) {
  return {
    type: "festival.jury.vote",
    payload: vote
  };
}

export function emitFestivalAwardGranted(award) {
  return {
    type: "festival.award.granted",
    payload: award
  };
}

export function emitFestivalEventStarted(event) {
  return {
    type: "festival.event.started",
    payload: event
  };
}

export function emitFestivalEventEnded(event) {
  return {
    type: "festival.event.ended",
    payload: event
  };
}`
  );

  //
  // FRONTEND COMPLETION
  //
  const feAdminDir = path.join(FE01, "ADMIN");
  const feAIDir = path.join(FE01, "AI");
  const feAnalyticsDir = path.join(FE01, "ANALYTICS");
  const feJuryDir = path.join(FE01, "JURY");
  const feModulesDir = path.join(FE01, "MODULES");
  const feRelationsDir = path.join(FE01, "RELATIONS");
  const feWorkflowDir = path.join(FE01, "WORKFLOW");

  ensureDir(feAdminDir);
  ensureDir(feAIDir);
  ensureDir(feAnalyticsDir);
  ensureDir(feJuryDir);
  ensureDir(feModulesDir);
  ensureDir(feRelationsDir);
  ensureDir(feWorkflowDir);

  // ADMIN
  ensureFile(
    path.join(feAdminDir, "AdminDashboard.js"),
    `export default function AdminDashboard() {
  return <div>Festival Admin Dashboard</div>;
}`
  );

  ensureFile(
    path.join(feAdminDir, "AdminAwardsPanel.js"),
    `export default function AdminAwardsPanel() {
  return <div>Admin Awards Panel</div>;
}`
  );

  ensureFile(
    path.join(feAdminDir, "AdminJuryPanel.js"),
    `export default function AdminJuryPanel() {
  return <div>Admin Jury Panel</div>;
}`
  );

  ensureFile(
    path.join(feAdminDir, "AdminSchedulePanel.js"),
    `export default function AdminSchedulePanel() {
  return <div>Admin Schedule Panel</div>;
}`
  );

  // AI
  ensureFile(
    path.join(feAIDir, "useFestivalAI.js"),
    `import { useState, useEffect } from "react";

export function useFestivalAI() {
  const [predictions, setPredictions] = useState({ hotCategories: [], potentialWinners: [] });

  useEffect(() => {
    // TODO: integrate with City AI Engine
    setPredictions({
      hotCategories: [],
      potentialWinners: []
    });
  }, []);

  return predictions;
}`
  );

  ensureFile(
    path.join(feAIDir, "FestivalAIPredictions.js"),
    `import { useFestivalAI } from "./useFestivalAI";

export default function FestivalAIPredictions() {
  const predictions = useFestivalAI();

  return (
    <div>
      <h3>Festival AI Predictions</h3>
      <div>Hot categories: {predictions.hotCategories.join(", ") || "brak"}</div>
      <div>Potential winners: {predictions.potentialWinners.join(", ") || "brak"}</div>
    </div>
  );
}`
  );

  // ANALYTICS
  ensureFile(
    path.join(feAnalyticsDir, "FestivalStats.js"),
    `export default function FestivalStats({ stats }) {
  return (
    <div>
      <h3>Festival Stats</h3>
      <div>Zgłoszenia: {stats?.submissions ?? 0}</div>
      <div>Jurorzy: {stats?.jury ?? 0}</div>
      <div>Kategorie nagród: {stats?.awardCategories ?? 0}</div>
    </div>
  );
}`
  );

  ensureFile(
    path.join(feAnalyticsDir, "FestivalCharts.js"),
    `export default function FestivalCharts() {
  return <div>Festival Charts (TODO: wykresy aktywności)</div>;
}`
  );

  ensureFile(
    path.join(feAnalyticsDir, "FestivalHeatmap.js"),
    `export default function FestivalHeatmap() {
  return <div>Festival Heatmap (TODO: integracja z City Heatmap)</div>;
}`
  );

  // JURY
  ensureFile(
    path.join(feJuryDir, "JuryPanel.js"),
    `export default function JuryPanel() {
  return <div>Jury Panel</div>;
}`
  );

  ensureFile(
    path.join(feJuryDir, "JuryVoteCard.js"),
    `export default function JuryVoteCard({ submission }) {
  return (
    <div>
      <h4>Ocena: {submission?.title || submission?.id}</h4>
      {/* TODO: formularz głosowania */}
    </div>
  );
}`
  );

  ensureFile(
    path.join(feJuryDir, "JuryReviewList.js"),
    `export default function JuryReviewList({ reviews }) {
  return (
    <div>
      <h3>Oceny jury</h3>
      <ul>
        {(reviews || []).map((r, i) => (
          <li key={i}>
            {r.submissionId} — {r.score} / {r.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}`
  );

  // MODULES
  ensureFile(
    path.join(feModulesDir, "FestivalTimeline.js"),
    `export default function FestivalTimeline({ events }) {
  return (
    <div>
      <h3>Oś czasu festiwalu</h3>
      <ul>
        {(events || []).map(e => (
          <li key={e.id}>{e.name} — {new Date(e.startsAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}`
  );

  ensureFile(
    path.join(feModulesDir, "FestivalAwards.js"),
    `export default function FestivalAwards({ awards }) {
  return (
    <div>
      <h3>Nagrody</h3>
      <ul>
        {(awards || []).map((a, i) => (
          <li key={i}>{a.categoryId} → {a.submissionId}</li>
        ))}
      </ul>
    </div>
  );
}`
  );

  ensureFile(
    path.join(feModulesDir, "FestivalSchedule.js"),
    `export default function FestivalSchedule({ schedule }) {
  return (
    <div>
      <h3>Harmonogram</h3>
      <ul>
        {(schedule || []).map((s, i) => (
          <li key={i}>{s.eventId} — {s.slot}</li>
        ))}
      </ul>
    </div>
  );
}`
  );

  // RELATIONS
  ensureFile(
    path.join(feRelationsDir, "CreatorFestivalRelations.js"),
    `export default function CreatorFestivalRelations({ relations }) {
  return (
    <div>
      <h3>Relacje twórca ↔ festiwal</h3>
      <ul>
        {(relations || []).map((r, i) => (
          <li key={i}>{r.creatorId} → {r.submissionId}</li>
        ))}
      </ul>
    </div>
  );
}`
  );

  ensureFile(
    path.join(feRelationsDir, "SubmissionRelations.js"),
    `export default function SubmissionRelations({ relations }) {
  return (
    <div>
      <h3>Relacje zgłoszenie ↔ jury / nagrody</h3>
      <ul>
        {(relations || []).map((r, i) => (
          <li key={i}>{r.submissionId} → {r.targetId} ({r.type})</li>
        ))}
      </ul>
    </div>
  );
}`
  );

  // WORKFLOW (FE)
  ensureFile(
    path.join(feWorkflowDir, "SubmissionWorkflow.js"),
    `export default function SubmissionWorkflow() {
  return <div>Submission Workflow (UI)</div>;
}`
  );

  ensureFile(
    path.join(feWorkflowDir, "JuryWorkflow.js"),
    `export default function JuryWorkflow() {
  return <div>Jury Workflow (UI)</div>;
}`
  );

  ensureFile(
    path.join(feWorkflowDir, "AwardsWorkflow.js"),
    `export default function AwardsWorkflow() {
  return <div>Awards Workflow (UI)</div>;
}`
  );

  console.log("=== Festival Pavilion Completion Pack generator done ===");
}

if (require.main === module) {
  main();
}
