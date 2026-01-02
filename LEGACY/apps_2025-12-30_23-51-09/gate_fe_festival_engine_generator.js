const fs = require("fs");
const path = require("path");

const FE_FOLDER = "FE-01__Festival_Pavilion";
const ROOT = __dirname;
const FE_PATH = path.join(ROOT, FE_FOLDER);

// ============ HELPERY ============

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function removeIfExists(p) {
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      fs.rmSync(p, { recursive: true, force: true });
    } else {
      fs.unlinkSync(p);
    }
    console.log(`🧹 Usunięto: ${path.relative(ROOT, p)}`);
  }
}

function writeFileForce(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Nadpisano: ${path.relative(ROOT, filePath)}`);
}

function writeIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    console.log(`✅ Utworzono: ${path.relative(ROOT, filePath)}`);
  } else {
    console.log(`ℹ️  Pominięto (istnieje): ${path.relative(ROOT, filePath)}`);
  }
}

// ============ KROK 1: CLEAN LEGACY ============

function cleanLegacy() {
  console.log("🧹 CLEAN FE-01: Czyszczenie legacy FE-01__Festival_Pavilion...");

  // Typowe stare pliki „jednoplikowego” frontu – do usunięcia, jeśli kiedyś istniały
  removeIfExists(path.join(FE_PATH, "index.js"));
  removeIfExists(path.join(FE_PATH, "main.js"));
  removeIfExists(path.join(FE_PATH, "App.jsx"));
  removeIfExists(path.join(FE_PATH, "App.js"));

  // Stare katalogi, jeśli były monolityczne
  // (UWAGA: nie usuwamy całego FE-01, tylko wybrane pliki; struktura zostanie zbudowana od nowa)
  console.log("🧹 CLEAN FE-01: Zakończono czyszczenie legacy.");
}

// ============ KROK 2: INSTALL FE-01 FESTIVAL FRONTEND ============

function installFestivalFrontend() {
  console.log("🏗 INSTALL FE-01: Instalacja FESTIVAL FRONTEND...");

  ensureDir(FE_PATH);

  const folders = [
    "DATA",
    "FORMS",
    "PANELS",
    "WORKFLOW",
    "AI",
    "JURY",
    "ADMIN"
  ];
  folders.forEach(f => ensureDir(path.join(FE_PATH, f)));

  // --- module.config.json (tylko jeśli brak) ---
  const moduleConfigPath = path.join(FE_PATH, "module.config.json");
  if (!fs.existsSync(moduleConfigPath)) {
    const cfg = {
      moduleId: "FE-01__Festival_Pavilion",
      description: "Frontend FESTIVAL ENGINE (Pavilion) dla CITYOF-GATE.",
      panels: [
        "SUBMISSIONS_FORM",
        "SUBMISSIONS_LIST",
        "SUBMISSION_DETAILS",
        "JURY_DASHBOARD",
        "AI_ANALYSIS",
        "FESTIVAL_ADMIN"
      ]
    };
    writeIfMissing(moduleConfigPath, JSON.stringify(cfg, null, 2));
  } else {
    console.log("ℹ️  Pominięto module.config.json (istnieje)");
  }

  // --- README ---
  writeIfMissing(
    path.join(FE_PATH, "README_FE-01__Festival_Pavilion.md"),
    `# FE-01__Festival_Pavilion

Frontend FESTIVAL ENGINE dla CITYOF-GATE.
Obsługuje zgłoszenia dzieł, listę zgłoszeń, workflow, jury, AI oraz panele admina.

Plik wygenerowany automatycznie.\n`
  );

  // --- index.js – punkt wejścia modułu FE-01 ---
  const indexJs = `// FE-01__Festival_Pavilion entry point
// Tutaj zakładamy, że istnieje globalny loader modułów miasta,
// który potrafi wstrzyknąć ten moduł do głównej aplikacji.

import { SubmissionsForm } from "./FORMS/SubmissionsForm";
import { SubmissionsList } from "./PANELS/SubmissionsList";
import { SubmissionDetails } from "./PANELS/SubmissionDetails";
import { JuryDashboard } from "./JURY/JuryDashboard";
import { AIAnalysisPanel } from "./AI/AIAnalysisPanel";
import { FestivalAdminPanel } from "./ADMIN/FestivalAdminPanel";

export const FestivalPavilionModule = {
  id: "FE-01__Festival_Pavilion",
  panels: {
    SUBMISSIONS_FORM: SubmissionsForm,
    SUBMISSIONS_LIST: SubmissionsList,
    SUBMISSION_DETAILS: SubmissionDetails,
    JURY_DASHBOARD: JuryDashboard,
    AI_ANALYSIS: AIAnalysisPanel,
    FESTIVAL_ADMIN: FestivalAdminPanel
  }
};
`;
  writeFileForce(path.join(FE_PATH, "index.js"), indexJs);

  // ========== FORMS/SubmissionsForm ==========

  const submissionsFormJs = `import React, { useState } from "react";

export function SubmissionsForm() {
  const [workId, setWorkId] = useState("");
  const [editionId, setEditionId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [submitterId, setSubmitterId] = useState("");
  const [feesPaid, setFeesPaid] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/festival/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workId,
          editionId,
          sectionId: sectionId || null,
          submitterId,
          feesPaid
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Submission failed");
      }

      const data = await res.json();
      setStatus("success");
      console.log("Submission created:", data);
    } catch (err) {
      console.error("SubmissionsForm error:", err);
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <div>
      <h2>Festival Pavilion — Zgłoszenie dzieła</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Work ID:</label>
          <input value={workId} onChange={e => setWorkId(e.target.value)} required />
        </div>
        <div>
          <label>Edition ID:</label>
          <input value={editionId} onChange={e => setEditionId(e.target.value)} required />
        </div>
        <div>
          <label>Section ID (opcjonalne):</label>
          <input value={sectionId} onChange={e => setSectionId(e.target.value)} />
        </div>
        <div>
          <label>Submitter ID:</label>
          <input value={submitterId} onChange={e => setSubmitterId(e.target.value)} required />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={feesPaid}
              onChange={e => setFeesPaid(e.target.checked)}
            />
            Opłata wniesiona / regulamin zaakceptowany
          </label>
        </div>
        <button type="submit" disabled={status === "loading"}>
          Wyślij zgłoszenie
        </button>
      </form>
      {status === "loading" && <p>Wysyłanie zgłoszenia...</p>}
      {status === "success" && <p>Zgłoszenie zostało utworzone.</p>}
      {status === "error" && <p>Błąd: {error}</p>}
    </div>
  );
}
`;
  writeFileForce(path.join(FE_PATH, "FORMS", "SubmissionsForm.jsx"), submissionsFormJs);

  // ========== PANELS/SubmissionsList ==========

  const submissionsListJs = `import React, { useEffect, useState } from "react";

export function SubmissionsList() {
  const [submissions, setSubmissions] = useState([]);
  const [editionId, setEditionId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadSubmissions() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (editionId) params.append("editionId", editionId);
      if (sectionId) params.append("sectionId", sectionId);
      if (status) params.append("status", status);

      const res = await fetch("/api/festival/submissions?" + params.toString());
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Cannot load submissions");
      }
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error("SubmissionsList error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSubmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Festival Pavilion — Lista zgłoszeń</h2>
      <div>
        <label>Edition ID:</label>
        <input value={editionId} onChange={e => setEditionId(e.target.value)} />
        <label>Section ID:</label>
        <input value={sectionId} onChange={e => setSectionId(e.target.value)} />
        <label>Status:</label>
        <input value={status} onChange={e => setStatus(e.target.value)} />
        <button onClick={loadSubmissions} disabled={loading}>
          Filtruj
        </button>
      </div>
      {loading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error}</p>}
      <ul>
        {submissions.map(sub => (
          <li key={sub.id}>
            <strong>{sub.id}</strong> — workId: {sub.workId} — status: {sub.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
`;
  writeFileForce(path.join(FE_PATH, "PANELS", "SubmissionsList.jsx"), submissionsListJs);

  // ========== PANELS/SubmissionDetails ==========

  const submissionDetailsJs = `import React, { useEffect, useState } from "react";

export function SubmissionDetails({ submissionId }) {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadSubmission() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/festival/submissions/" + submissionId);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Cannot load submission");
      }
      const data = await res.json();
      setSubmission(data);
    } catch (err) {
      console.error("SubmissionDetails error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (submissionId) {
      loadSubmission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  async function callAction(path) {
    setActionLoading(true);
    setError(null);
    try {
      const res = await fetch(path, { method: "POST" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Action failed");
      }
      await loadSubmission();
    } catch (err) {
      console.error("SubmissionDetails action error:", err);
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  if (!submissionId) {
    return <p>Brak wybranego zgłoszenia.</p>;
  }

  if (loading) {
    return <p>Ładowanie zgłoszenia...</p>;
  }

  if (error) {
    return <p>Błąd: {error}</p>;
  }

  if (!submission) {
    return <p>Zgłoszenie nie znalezione.</p>;
  }

  const basePath = "/api/festival/submissions/" + submission.id;

  return (
    <div>
      <h2>Festival Pavilion — Szczegóły zgłoszenia</h2>
      <pre>{JSON.stringify(submission, null, 2)}</pre>

      <div>
        <h3>Akcje workflow</h3>
        <button
          disabled={actionLoading}
          onClick={() => callAction(basePath + "/legal-check")}
        >
          Legal check
        </button>
        <button
          disabled={actionLoading}
          onClick={() => callAction(basePath + "/fingerprint-check")}
        >
          Fingerprint check
        </button>
        <button
          disabled={actionLoading}
          onClick={() => callAction(basePath + "/ai-analysis")}
        >
          AI analysis
        </button>
        <button
          disabled={actionLoading}
          onClick={() => callAction(basePath + "/certify")}
        >
          Certify
        </button>
      </div>

      {actionLoading && <p>Wykonywanie akcji...</p>}
      {error && <p>Błąd: {error}</p>}
    </div>
  );
}
`;
  writeFileForce(path.join(FE_PATH, "PANELS", "SubmissionDetails.jsx"), submissionDetailsJs);

  // ========== JURY/JuryDashboard ==========

  const juryDashboardJs = `import React from "react";

export function JuryDashboard() {
  // Placeholder — w kolejnych iteracjach podłączymy realne endpointy jury
  return (
    <div>
      <h2>Festival Pavilion — Jury Dashboard</h2>
      <p>Panel dla jurorów (do rozbudowy: lista przypisanych zgłoszeń, formularz ocen, komentarze).</p>
    </div>
  );
}
`;
  writeFileForce(path.join(FE_PATH, "JURY", "JuryDashboard.jsx"), juryDashboardJs);

  // ========== AI/AIAnalysisPanel ==========

  const aiAnalysisJs = `import React from "react";

export function AIAnalysisPanel() {
  // Placeholder — później podłączymy wyniki AI z backendu
  return (
    <div>
      <h2>Festival Pavilion — AI Analysis</h2>
      <p>Panel dla organizatorów (wizualizacja wyników AI, rekomendacje, porównania).</p>
    </div>
  );
}
`;
  writeFileForce(path.join(FE_PATH, "AI", "AIAnalysisPanel.jsx"), aiAnalysisJs);

  // ========== ADMIN/FestivalAdminPanel ==========

  const festivalAdminJs = `import React from "react";

export function FestivalAdminPanel() {
  // Placeholder — później: edycje, sekcje, sale, miasta, harmonogram, wolontariat, press, bilety
  return (
    <div>
      <h2>Festival Pavilion — Panel organizatora</h2>
      <p>Zarządzanie edycjami festiwalu, sekcjami, salami, harmonogramem i zespołem.</p>
    </div>
  );
}
`;
  writeFileForce(path.join(FE_PATH, "ADMIN", "FestivalAdminPanel.jsx"), festivalAdminJs);

  console.log("🏗 INSTALL FE-01: FESTIVAL FRONTEND zainstalowany.");
}

// ============ MAIN ============

console.log("🚀 FESTIVAL FRONTEND GENERATOR v1 start...");
cleanLegacy();
installFestivalFrontend();
console.log("🏙️ FESTIVAL FRONTEND GENERATOR v1 zakończony.");
