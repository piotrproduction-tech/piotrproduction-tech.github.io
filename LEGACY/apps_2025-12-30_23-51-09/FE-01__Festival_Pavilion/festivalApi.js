export async function getSubmissions() {
  return [
    { id: "1", title: "Film 1", status: "submitted", director: "Autor 1" },
    { id: "2", title: "Film 2", status: "selected", director: "Autor 2" }
  ];
}

export async function getSubmissionById(id) {
  return {
    id,
    title: "Mock Film " + id,
    director: "Mock Autor",
    status: "submitted",
    synopsis: "To jest przykładowy opis filmu.",
    duration: 90
  };
}

export async function createSubmission(payload) {
  console.log("createSubmission (mock)", payload);
  return { success: true, id: String(Date.now()) };
}

export async function getJuryDashboardData() {
  return {
    juryName: "Jury Główne",
    assignedSubmissions: [
      { id: "1", title: "Film 1", status: "to_review" },
      { id: "2", title: "Film 2", status: "to_review" }
    ]
  };
}

export async function getAIAnalysisOverview() {
  return {
    totalAnalyzed: 12,
    insights: [
      "AI wykryła wysokie emocje w 7 filmach.",
      "4 filmy mają ponadprzeciętny potencjał festiwalowy."
    ]
  };
}

export async function getAdminOverview() {
  return {
    totalSubmissions: 42,
    selected: 10,
    rejected: 5,
    inReview: 27
  };
}
