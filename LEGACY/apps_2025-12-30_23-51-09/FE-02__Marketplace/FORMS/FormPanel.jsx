import React, { useState } from "react";
import { createItem } from "../api.js";

export default function FormPanel() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await createItem({ name });
    setMessage("Zapisano (mock). ID: " + result.id);
  }

  return (
    <div>
      <h2>Nowy element</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nazwa"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Zapisz</button>
      </form>
      {message && <p>{message}</p>}
      <a href="/marketplace">← Powrót</a>
    </div>
  );
}
