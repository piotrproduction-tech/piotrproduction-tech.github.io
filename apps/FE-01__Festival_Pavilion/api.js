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



// API_SUBMISSIONS
export async function getFestivalSubmissions() {
  const res = await fetch("/api/festival/submissions");
  return res.json();
}

export async function createFestivalSubmission(payload) {
  const res = await fetch("/api/festival/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function getSubmissionDetails(id) {
  const res = await fetch("/api/festival/submissions/" + id);
  return res.json();
}



// API_JURY
export async function getJuryMembers() {
  const res = await fetch("/api/festival/jury");
  return res.json();
}

export async function assignSubmissionToJury(submissionId, juryId) {
  const res = await fetch("/api/festival/jury/assign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ submissionId, juryId })
  });
  return res.json();
}

export async function getJuryAssignments() {
  const res = await fetch("/api/festival/jury/assignments");
  return res.json();
}

export async function getJuryAssignmentsForCurrent() {
  const res = await fetch("/api/festival/jury/my-assignments");
  return res.json();
}

export async function submitJuryVote(submissionId, score, comment) {
  const res = await fetch("/api/festival/jury/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ submissionId, score, comment })
  });
  return res.json();
}



// API_AWARDS
export async function getAwardCategories() {
  const res = await fetch("/api/festival/awards/categories");
  return res.json();
}

export async function createAwardCategory(name, description) {
  const res = await fetch("/api/festival/awards/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description })
  });
  return res.json();
}

export async function grantAward(categoryId, submissionId) {
  const res = await fetch("/api/festival/awards/grant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categoryId, submissionId })
  });
  return res.json();
}



// API_EVENTS
export async function getFestivalEvents() {
  const res = await fetch("/api/festival/events");
  return res.json();
}

export async function createFestivalEvent(name, startsAt, endsAt) {
  const res = await fetch("/api/festival/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, startsAt, endsAt })
  });
  return res.json();
}

export async function updateFestivalEvent(id, patch) {
  const res = await fetch("/api/festival/events/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch)
  });
  return res.json();
}



// API_SCHEDULE
export async function getFestivalSchedule() {
  const res = await fetch("/api/festival/schedule");
  return res.json();
}

export async function addToFestivalSchedule(eventId, slot) {
  const res = await fetch("/api/festival/schedule", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, slot })
  });
  return res.json();
}



// API_STATS
export async function getFestivalStats() {
  const res = await fetch("/api/festival/stats");
  return res.json();
}

export async function getFestivalStatsTimeline() {
  const res = await fetch("/api/festival/stats/timeline");
  return res.json();
}



// API_HEATMAP
export async function getFestivalHeatmap() {
  const res = await fetch("/api/festival/heatmap");
  return res.json();
}



// API_NARRATIVE
export async function getFestivalNarrative() {
  const res = await fetch("/api/festival/narrative");
  return res.json();
}



// API_AI
export async function getFestivalAIPredictions() {
  const res = await fetch("/api/festival/ai/predictions");
  return res.json();
}
