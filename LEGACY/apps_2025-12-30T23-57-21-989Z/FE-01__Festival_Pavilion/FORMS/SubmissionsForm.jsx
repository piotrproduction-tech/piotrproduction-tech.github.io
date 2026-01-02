import React, { useState } from "react";
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
        <input
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Reżyser"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <textarea
          placeholder="Opis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />
        <button type="submit">Zapisz</button>
      </form>
      {message && <p>{message}</p>}
      <a href="/festival">← Powrót</a>
    </div>
  );
}
