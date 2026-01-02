import React, { useState } from "react";
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
