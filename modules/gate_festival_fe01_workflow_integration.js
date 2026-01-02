/**
 * DUŻY KROK A — Integracja workflow FESTIWALU z FE-01__Festival_Pavilion
 *
 * Dokłada:
 * - FE-01/DATA/useFestivalWorkflowApi.js
 * - FE-01/PANELS/FilmSubmissionsWorkflowPanel.js
 * - FE-01/PANELS/JuryWorkflowPanel.js
 * - FE-01/PANELS/EventWorkflowPanel.js
 *
 * Próbuje delikatnie podpiąć panele do index.js (bez nadpisywania istniejącej logiki).
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function writeIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, content);
    console.log(`📄 Utworzono: ${path.relative(ROOT, filePath)}`);
  } else {
    console.log(`⏭  Istnieje, pomijam: ${path.relative(ROOT, filePath)}`);
  }
}

console.log("🏙️  DUŻY KROK A — FE-01 workflow integration START...");

if (!fs.existsSync(FE01)) {
  console.error("❌ Brak apps/FE-01__Festival_Pavilion");
  process.exit(1);
}

// 1. Hook API
const dataDir = path.join(FE01, "DATA");
ensureDir(dataDir);

const apiHookPath = path.join(dataDir, "useFestivalWorkflowApi.js");
writeIfMissing(
  apiHookPath,
  `// Hook API do pracy z workflow FESTIWALU (zgłoszenia, jury, wydarzenia)

import { useEffect, useState } from "react";

const BASE_URL = "/api/festival";

function useWorkflowList(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`\${BASE_URL}/\${endpoint}\`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data || []);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  }, [endpoint]);

  return { items, loading };
}

export function useFilmSubmissions() {
  return useWorkflowList("filmSubmissions");
}

export function useJuryEvaluations() {
  return useWorkflowList("juryEvaluations");
}

export function useFestivalEvents() {
  return useWorkflowList("events");
}

export async function changeState(entityType, id, newState) {
  const res = await fetch(\`\${BASE_URL}/\${entityType}/\${id}/state\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state: newState })
  });
  return res.json();
}
`
);

// 2. Panele

const panelsDir = path.join(FE01, "PANELS");
ensureDir(panelsDir);

const filmPanelPath = path.join(panelsDir, "FilmSubmissionsWorkflowPanel.js");
writeIfMissing(
  filmPanelPath,
  `import React from "react";
import { useFilmSubmissions, changeState } from "../DATA/useFestivalWorkflowApi";

const NEXT_STATES = {
  draft: ["submitted"],
  submitted: ["under_review"],
  under_review: ["accepted", "rejected"],
  accepted: ["awarded"],
  rejected: [],
  awarded: []
};

export function FilmSubmissionsWorkflowPanel() {
  const { items, loading } = useFilmSubmissions();

  if (loading) return <div>Ładowanie zgłoszeń...</div>;
  if (!items.length) return <div>Brak zgłoszeń filmowych.</div>;

  const handleChange = (id, state) => async () => {
    await changeState("filmSubmissions", id, state);
    window.location.reload(); // proste odświeżenie, do wymiany na lepsze
  };

  return (
    <div>
      <h2>Workflow zgłoszeń filmowych</h2>
      <ul>
        {items.map((item) => {
          const nextStates = NEXT_STATES[item.state] || [];
          return (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              <strong>{item.title}</strong> — stan: {item.state}
              <div>
                {nextStates.map((s) => (
                  <button
                    key={s}
                    onClick={handleChange(item.id, s)}
                    style={{ marginRight: "4px" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
`
);

const juryPanelPath = path.join(panelsDir, "JuryWorkflowPanel.js");
writeIfMissing(
  juryPanelPath,
  `import React from "react";
import { useJuryEvaluations, changeState } from "../DATA/useFestivalWorkflowApi";

const NEXT_STATES = {
  assigned: ["evaluating"],
  evaluating: ["completed"],
  completed: []
};

export function JuryWorkflowPanel() {
  const { items, loading } = useJuryEvaluations();

  if (loading) return <div>Ładowanie prac jury...</div>;
  if (!items.length) return <div>Brak prac jury.</div>;

  const handleChange = (id, state) => async () => {
    await changeState("juryEvaluations", id, state);
    window.location.reload();
  };

  return (
    <div>
      <h2>Workflow jury</h2>
      <ul>
        {items.map((item) => {
          const nextStates = NEXT_STATES[item.state] || [];
          return (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              <strong>{item.filmTitle}</strong> — stan: {item.state}
              <div>
                {nextStates.map((s) => (
                  <button
                    key={s}
                    onClick={handleChange(item.id, s)}
                    style={{ marginRight: "4px" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
`
);

const eventPanelPath = path.join(panelsDir, "EventWorkflowPanel.js");
writeIfMissing(
  eventPanelPath,
  `import React from "react";
import { useFestivalEvents, changeState } from "../DATA/useFestivalWorkflowApi";

const NEXT_STATES = {
  planned: ["published"],
  published: ["archived"],
  archived: []
};

export function EventWorkflowPanel() {
  const { items, loading } = useFestivalEvents();

  if (loading) return <div>Ładowanie wydarzeń...</div>;
  if (!items.length) return <div>Brak wydarzeń festiwalowych.</div>;

  const handleChange = (id, state) => async () => {
    await changeState("events", id, state);
    window.location.reload();
  };

  return (
    <div>
      <h2>Workflow wydarzeń festiwalowych</h2>
      <ul>
        {items.map((item) => {
          const nextStates = NEXT_STATES[item.state] || [];
          return (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              <strong>{item.name}</strong> — stan: {item.state}
              <div>
                {nextStates.map((s) => (
                  <button
                    key={s}
                    onClick={handleChange(item.id, s)}
                    style={{ marginRight: "4px" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
`
);

// 3. Delikatne podpięcie do index.js (jeśli możliwe)
const indexPath = path.join(FE01, "index.js");
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, "utf8");
  if (!content.includes("FilmSubmissionsWorkflowPanel")) {
    content =
      `import { FilmSubmissionsWorkflowPanel } from "./PANELS/FilmSubmissionsWorkflowPanel";\n` +
      `import { JuryWorkflowPanel } from "./PANELS/JuryWorkflowPanel";\n` +
      `import { EventWorkflowPanel } from "./PANELS/EventWorkflowPanel";\n` +
      content;
    fs.writeFileSync(indexPath, content);
    console.log(`🔗 Dodano importy paneli workflow do ${path.relative(ROOT, indexPath)}`);
  } else {
    console.log("⏭  index.js FE-01 już zawiera panele workflow — pomijam.");
  }
} else {
  console.log("⚠️  Brak index.js w FE-01__Festival_Pavilion — nie podpinam paneli automatycznie.");
}

console.log("🎉 DUŻY KROK A — FE-01 workflow integration ZAKOŃCZONE.");
