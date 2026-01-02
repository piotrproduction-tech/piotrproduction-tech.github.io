import React from "react";
import SubmissionsList from "./panels/SubmissionsList.jsx";
import SubmissionDetails from "./panels/SubmissionDetails.jsx";
import SubmissionsForm from "./FORMS/SubmissionsForm.jsx";
import JuryDashboard from "./JURY/JuryDashboard.jsx";
import AIAnalysisPanel from "./AI/AIAnalysisPanel.jsx";
import FestivalAdminPanel from "./ADMIN/FestivalAdminPanel.jsx";

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

    if (route === "/festival/jury") return <JuryDashboard />;
    if (route === "/festival/ai") return <AIAnalysisPanel />;
    if (route === "/festival/admin") return <FestivalAdminPanel />;

    return (
      <div>
        <h2>Festival Pavilion</h2>
        <p>Nie znaleziono strony FESTIWALU dla ścieżki: {route}</p>
      </div>
    );
  },

  panels: {
    SubmissionsList,
    SubmissionsForm,
    SubmissionDetails,
    JuryDashboard,
    AIAnalysisPanel,
    FestivalAdminPanel
  }
};
