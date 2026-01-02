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
