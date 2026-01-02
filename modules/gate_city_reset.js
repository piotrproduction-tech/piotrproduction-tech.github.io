const fs = require("fs");
const path = require("path");

// ROOT = katalog główny repo
const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");
const BACKEND = path.join(ROOT, "backend");
const MODULES = path.join(ROOT, "modules");
const LEGACY = path.join(ROOT, "LEGACY");

// Lista plików i folderów do usunięcia z ROOT
const ROOT_TRASH = [
  "api.js",
  "loader.js",
  "diagnostics.js",
  "index.html",
  "styles.css",
  "migration-log.txt",
  "migration-log-v2.txt"
];

// Lista folderów do usunięcia z modules/
const MODULES_TRASH = [
  "FE-00__City",
  "FE-01",
  "FE-02", "FE-03", "FE-04", "FE-05", "FE-06", "FE-07", "FE-08", "FE-09",
  "FE-10", "FE-11", "FE-12", "FE-13", "FE-14", "FE-15", "FE-16", "FE-17",
  "FE-18", "FE-19", "FE-20", "FE-21", "FE-22", "FE-23", "FE-24", "FE-25",
  "FE-26", "FE-27", "FE-28", "FE-29", "FE-30", "FE-31", "FE-32", "FE-33",
  "FE-34", "FE-35", "FE-36", "FE-37", "FE-38", "FE-39", "FE-40", "FE-41",
  "FE-42", "FE-43", "FE-44", "FE-45", "FE-46", "FE-47", "FE-48", "FE-49",
  "FE-50", "FE-51", "FE-52", "FE-53",
  "TESTMODULE",
  "system",
  "user",
  "admin"
];

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function moveIfExists(src, destBaseName) {
  if (!fs.existsSync(src)) return;

  ensureDir(LEGACY);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const dest = path.join(LEGACY, `${destBaseName}_${stamp}`);

  fs.renameSync(src, dest);
  console.log(`📦 Przeniesiono ${path.basename(src)}/ → ${path.relative(ROOT, dest)}/`);
}

function deleteIfExists(target) {
  const full = path.join(ROOT, target);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`🗑️ Usunięto: ${target}`);
  }
}

function deleteModuleFolder(name) {
  const full = path.join(MODULES, name);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`🗑️ Usunięto moduł: modules/${name}`);
  }
}

function writeFileForce(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
  console.log(`✅ Utworzono: ${path.relative(ROOT, filePath)}`);
}

// --------------------------------------------------
// 1. ARCHIWIZACJA STAREGO FRONTENDU I BACKENDU
// --------------------------------------------------
console.log("🏙️  CITY RESET v2 START...");

moveIfExists(APPS, "apps");
moveIfExists(BACKEND, "backend");

// --------------------------------------------------
// 2. USUWANIE ŚMIECI Z ROOT
// --------------------------------------------------
ROOT_TRASH.forEach(deleteIfExists);

// --------------------------------------------------
// 3. USUWANIE STARYCH MODUŁÓW Z modules/
// --------------------------------------------------
MODULES_TRASH.forEach(deleteModuleFolder);

// --------------------------------------------------
// 4. TWORZENIE NOWEGO apps/ i backend/
// --------------------------------------------------
ensureDir(APPS);
ensureDir(BACKEND);

// --------------------------------------------------
// 5. NOWE FE-00__City
// --------------------------------------------------
const FE00 = path.join(APPS, "FE-00__City");

writeFileForce(
  path.join(FE00, "index.js"),
  `import React from "react";
import { ModuleLoader } from "./modules/ModuleLoader.js";

export function CityApp() {
  return (
    <div>
      <h1>CITYOF-GATE</h1>
      <ModuleLoader />
    </div>
  );
}
`
);

writeFileForce(
  path.join(FE00, "modules", "ModuleLoader.js"),
  `import React, { useState } from "react";
import { FestivalPavilionModule } from "../../FE-01__Festival_Pavilion/index.js";

const modules = [FestivalPavilionModule];

export function ModuleLoader() {
  const [route, setRoute] = useState("/festival");

  const handleNav = (newRoute) => (e) => {
    e.preventDefault();
    setRoute(newRoute);
  };

  const activeModule =
    modules.find((m) => route.startsWith(m.config.baseRoute)) || modules[0];

  return (
    <div>
      <nav>
        <a href="/festival" onClick={handleNav("/festival")}>Festival</a>
      </nav>
      <hr />
      {activeModule.router(route)}
    </div>
  );
}
`
);

// --------------------------------------------------
// 6. NOWE FE-01__Festival_Pavilion
// --------------------------------------------------
const FE01 = path.join(APPS, "FE-01__Festival_Pavilion");

// module.config.json
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

// festivalApi.js
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
`
);

// index.js
writeFileForce(
  path.join(FE01, "index.js"),
  `import React from "react";
import SubmissionsList from "./panels/SubmissionsList.jsx";
import SubmissionDetails from "./panels/SubmissionDetails.jsx";
import SubmissionsForm from "./FORMS/SubmissionsForm.jsx";

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

    return <div>Nie znaleziono strony FESTIWALU: {route}</div>;
  }
};
`
);

// Panele
writeFileForce(
  path.join(FE01, "panels", "SubmissionsList.jsx"),
  `import React, { useEffect, useState } from "react";
import { getSubmissions } from "../festivalApi.js";

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getSubmissions();
      setSubmissions(data);
    })();
  }, []);

  return (
    <div>
      <h2>Zgłoszenia festiwalowe</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s.id}>
            {s.title} — {s.director} ({s.status}){" "}
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
      <p>{submission.title}</p>
      <p>{submission.director}</p>
      <p>{submission.synopsis}</p>
      <a href="/festival">← Powrót</a>
    </div>
  );
}
`
);

writeFileForce(
  path.join(FE01, "FORMS", "SubmissionsForm.jsx"),
  `import React, { useState } from "react";
import { createSubmission } from "../festivalApi.js";

export default function SubmissionsForm() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createSubmission({ title, director, synopsis });
    setMsg("Zapisano (mock). ID: " + res.id);
  }

  return (
    <div>
      <h2>Nowe zgłoszenie</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tytuł" />
        <input value={director} onChange={(e) => setDirector(e.target.value)} placeholder="Reżyser" />
        <textarea value={synopsis} onChange={(e) => setSynopsis(e.target.value)} placeholder="Opis" />
        <button type="submit">Zapisz</button>
      </form>
      {msg && <p>{msg}</p>}
      <a href="/festival">← Powrót</a>
    </div>
  );
}
`
);

console.log("🎉 CITY RESET v2 ZAKOŃCZONY — miasto jest czyste i gotowe.");
