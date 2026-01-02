import React from "react";
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
