// Hook API do pracy z workflow FESTIWALU (zgłoszenia, jury, wydarzenia)

import { useEffect, useState } from "react";

const BASE_URL = "/api/festival";

function useWorkflowList(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/${endpoint}`)
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
  const res = await fetch(`${BASE_URL}/${entityType}/${id}/state`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state: newState })
  });
  return res.json();
}
