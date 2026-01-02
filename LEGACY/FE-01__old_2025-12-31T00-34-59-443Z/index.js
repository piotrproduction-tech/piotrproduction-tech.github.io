import React from "react";
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
