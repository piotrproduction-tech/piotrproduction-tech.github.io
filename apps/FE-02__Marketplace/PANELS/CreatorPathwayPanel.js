import React from "react";

const STAGES = [
  {
    id: "marketplace",
    label: "Marketplace",
    description: "Pierwszy krok — wystawiasz swoje rzeczy w Marketplace."
  },
  {
    id: "marketplace_street",
    label: "Marketplace Street",
    description: "Twoje rzeczy zaczynają być widoczne jako stała obecność."
  },
  {
    id: "creator",
    label: "Creator",
    description: "Masz już rozpoznawalny styl i aktywność."
  },
  {
    id: "certified_creator",
    label: "Certified Creator",
    description: "Oficjalnie certyfikowany twórca w CITYOF-GATE."
  }
];

export function CreatorPathwayPanel() {
  // TODO: podpiąć realne dane użytkownika (obecny etap, spełnione wymagania)
  const currentStageId = "marketplace";

  return (
    <div>
      <h2>Creator Pathway</h2>
      <ol>
        {STAGES.map((stage) => {
          const isCurrent = stage.id === currentStageId;
          return (
            <li key={stage.id} style={{ marginBottom: "8px" }}>
              <strong>{stage.label}</strong>
              {isCurrent && " (tu jesteś teraz)"}
              <div>{stage.description}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
