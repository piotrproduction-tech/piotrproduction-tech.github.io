import React from "react";
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
