export const festivalSubmissionsWorkflow = {
  createSubmission(payload) {
    // TODO: validate, normalize, persist
    return {
      ...payload,
      status: "submitted",
      createdAt: Date.now()
    };
  },
  updateStatus(submission, status) {
    return { ...submission, status, updatedAt: Date.now() };
  }
};


// WF_SUBMISSIONS_CORE
// Core workflow for festival submissions

export function createSubmissionWorkflow(globalState, payload) {
  globalState.festival = globalState.festival || {};
  globalState.festival.submissions = globalState.festival.submissions || [];

  const submission = {
    id: "sub_" + Date.now(),
    title: payload.title,
    director: payload.director,
    category: payload.category,
    synopsis: payload.synopsis,
    createdAt: Date.now(),
    status: "submitted"
  };

  globalState.festival.submissions.push(submission);

  return {
    submission,
    events: [
      {
        type: "FESTIVAL_SUBMISSION_CREATED",
        submissionId: submission.id,
        timestamp: Date.now()
      }
    ]
  };
}

export function listSubmissionsWorkflow(globalState) {
  const submissions = globalState.festival?.submissions || [];
  return { submissions };
}

export function getSubmissionDetailsWorkflow(globalState, id) {
  const submissions = globalState.festival?.submissions || [];
  const found = submissions.find(s => s.id === id);
  return { submission: found || null };
}
