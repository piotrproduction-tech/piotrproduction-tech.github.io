const fs = require("fs");
const path = require("path");

// ROOT = katalog główny repo, niezależnie skąd odpalasz generator
const ROOT = process.cwd();

// Ścieżki absolutne
const APPS = path.join(ROOT, "apps");
const FE01 = path.join(APPS, "FE-01__Festival_Pavilion");

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function writeFileForce(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Utworzono: ${path.relative(ROOT, filePath)}`);
}

console.log("🎬 FE-01__Festival_Pavilion ROOT-SAFE GENERATOR start...");

// 1. module.config.json
writeFileForce(
  path.join(FE01, "module.config.json"),
  `{
  "id": "FE-01",
  "name": "Festival Pavilion",
  "baseRoute": "/festival",
  "description": "Moduł Festiwalowy CITYOF-GATE"
}
`
);

// 2. festivalApi.js (mock backend)
writeFileForce(
  path.join(FE01, "festivalApi.js"),
  `export async function getSubmissions() {
  return [
    { id: "1", title: "Film 1", status: "submitted", director: "Autor 1" },
    { id: "2", title: "Film 2", status: "selected", director: "Autor 2" }
  ];
}

export async function getSubmissionById(id) {
  return {
    id,
    title: "Mock Film " + id,
    director: "Mock Autor",
    status: "submitted",
    synopsis: "To jest przykładowy opis filmu.",
    duration: 90
  };
}

export async function createSubmission(payload) {
  console.log("createSubmission (mock)", payload);
  return { success: true, id: String(Date.now()) };
}

export async function getJuryDashboardData() {
  return {
    juryName: "Jury Główne",
    assignedSubmissions: [
      { id: "1", title: "Film 1", status: "to_review" },
      { id: "2", title: "Film 2", status: "to_review" }
    ]
  };
}

export async function getAIAnalysisOverview() {
  return {
    totalAnalyzed: 12,
    insights: [
      "AI wykryła wysokie emocje w 7 filmach.",
      "4 filmy mają ponadprzeciętny potencjał festiwalowy."
    ]
  };
}

export async function getAdminOverview() {
  return {
    totalSubmissions: 42,
    selected: 10,
    rejected: 5,
    inReview: 27
  };
}
`
);

// 3. index.js – moduł FE-01
writeFileForce(
  path.join(FE01, "index.js"),
  `import React from "react";
import SubmissionsList from "./panels/SubmissionsList.jsx";
import SubmissionDetails from "./panels/SubmissionDetails.jsx";
import SubmissionsForm from "./FORMS/SubmissionsForm.jsx";
import JuryDashboard from "./JURY/JuryDashboard.jsx";
import AIAnalysisPanel from "./AI/AIAnalysisPanel.jsx";
import FestivalAdminPanel from "./ADMIN/FestivalAdminPanel.jsx";

export const FestivalPavilionModule = {
  config: {
    id: "FE-01",
    name: "Festival Pavilion",
    baseRoute: "/festival"
  },

  router: (route) => {
    if (route === "/festival") return <SubmissionsList />;
    if (route === "/festival/submit") return <SubmissionsForm />;

    if (route.startsWith("/festival/submission/")) {
      const id = route.split("/").pop();
      return <SubmissionDetails submissionId={id} />;
    }

    if (route === "/festival/jury") return <JuryDashboard />;
    if (route === "/festival/ai") return <AIAnalysisPanel />;
    if (route === "/festival/admin") return <FestivalAdminPanel />;

    return (
      <div>
        <h2>Festival Pavilion</h2>
        <p>Nie znaleziono strony FESTIWALU dla ścieżki: {route}</p>
      </div>
    );
  },

  panels: {
    SubmissionsList,
    SubmissionsForm,
    SubmissionDetails,
    JuryDashboard,
    AIAnalysisPanel,
    FestivalAdminPanel
  }
};
`
);

// 4. Panele React
writeFileForce(
  path.join(FE01, "panels", "SubmissionsList.jsx"),
  `import React, { useEffect, useState } from "react";
import { getSubmissions } from "../festivalApi.js";

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getSubmissions();
      setSubmissions(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Ładowanie zgłoszeń...</div>;

  return (
    <div>
      <h2>Zgłoszenia festiwalowe</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s.id}>
            <strong>{s.title}</strong> — {s.director} ({s.status}){" "}
            <a href={"/festival/submission/" + s.id}>Szczegóły</a>
          </li>
        ))}
      </ul>
      <a href="/festival/submit">Dodaj nowe zgłoszenie</a>
    </div>
  );
}
`
);

writeFileForce(
  path.join(FE01, "panels", "SubmissionDetails.jsx"),
  `import React, { useEffect, useState } from "react";
import { getSubmissionById } from "../festivalApi.js";

export default function SubmissionDetails({ submissionId }) {
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getSubmissionById(submissionId);
      setSubmission(data);
    })();
  }, [submissionId]);

  if (!submission) return <div>Ładowanie...</div>;

  return (
    <div>
      <h2>Szczegóły zgłoszenia</h2>
      <p><strong>Tytuł:</strong> {submission.title}</p>
      <p><strong>Reżyser:</strong> {submission.director}</p>
      <p><strong>Status:</strong> {submission.status}</p>
      <p><strong>Opis:</strong> {submission.synopsis}</p>
      <p><strong>Czas trwania:</strong> {submission.duration} min</p>
      <a href="/festival">← Powrót</a>
    </div>
  );
}
`
);

// 5. Formularz
writeFileForce(
  path.join(FE01, "FORMS", "SubmissionsForm.jsx"),
  `import React, { useState } from "react";
import { createSubmission } from "../festivalApi.js";

export default function SubmissionsForm() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await createSubmission({ title, director, synopsis });
    setMessage("Zapisano (mock). ID: " + result.id);
  }

  return (
    <div>
      <h2>Nowe zgłoszenie</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Reżyser" value={director} onChange={(e) => setDirector(e.target.value)} />
        <textarea placeholder="Opis" value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />
        <button type="submit">Zapisz</button>
      </form>
      {message && <p>{message}</p>}
      <a href="/festival">← Powrót</a>
    </div>
  );
}
`
);

// 6. Jury
writeFileForce(
  path.join(FE01, "JURY", "JuryDashboard.jsx"),
  `import React, { useEffect, useState } from "react";
import { getJuryDashboardData } from "../festivalApi.js";

export default function JuryDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getJuryDashboardData();
      setData(res);
    })();
  }, []);

  if (!data) return <div>Ładowanie...</div>;

  return (
    <div>
      <h2>Panel Jury – {data.juryName}</h2>
      <ul>
        {data.assignedSubmissions.map((s) => (
          <li key={s.id}>
            {s.title} — <a href={"/festival/submission/" + s.id}>Szczegóły</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
`
);

// 7. AI
writeFileForce(
  path.join(FE01, "AI", "AIAnalysisPanel.jsx"),
  `import React, { useEffect, useState } from "react";
import { getAIAnalysisOverview } from "../festivalApi.js";

export default function AIAnalysisPanel() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getAIAnalysisOverview();
      setOverview(res);
    })();
  }, []);

  if (!overview) return <div>Ładowanie...</div>;

  return (
    <div>
      <h2>Analiza AI</h2>
      <p>Przeanalizowano filmów: {overview.totalAnalyzed}</p>
      <ul>
        {overview.insights.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
`
);

// 8. Admin
writeFileForce(
  path.join(FE01, "ADMIN", "FestivalAdminPanel.jsx"),
  `import React, { useEffect, useState } from "react";
import { getAdminOverview } from "../festivalApi.js";

export default function FestivalAdminPanel() {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getAdminOverview();
      setOverview(res);
    })();
  }, []);

  if (!overview) return <div>Ładowanie...</div>;

  return (
    <div>
      <h2>Panel administracyjny</h2>
      <p>Łącznie zgłoszeń: {overview.totalSubmissions}</p>
      <p>Wybrane: {overview.selected}</p>
      <p>Odrzucone: {overview.rejected}</p>
      <p>W trakcie oceny: {overview.inReview}</p>
    </div>
  );
}
`
);

console.log("🎉 FE-01 ROOT-SAFE GENERATOR zakończony.");
