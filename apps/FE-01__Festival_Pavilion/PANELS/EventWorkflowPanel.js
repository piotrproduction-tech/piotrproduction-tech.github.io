import React from "react";
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
