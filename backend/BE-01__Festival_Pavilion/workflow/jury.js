export const festivalJuryWorkflow = {
  assignToJury(submissionId, juryId) {
    return {
      submissionId,
      juryId,
      assignedAt: Date.now()
    };
  },
  recordVote(submissionId, juryId, score, comment) {
    return {
      submissionId,
      juryId,
      score,
      comment,
      votedAt: Date.now()
    };
  }
};


// WF_JURY_CORE
// Core workflow for jury assignments and voting

export function listJuryMembersWorkflow(globalState) {
  const jury = globalState.festival?.jury || [];
  return { jury };
}

export function assignSubmissionToJuryWorkflow(globalState, { submissionId, juryId }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.assignments = globalState.festival.assignments || [];

  const assignment = {
    id: "assign_" + Date.now(),
    submissionId,
    juryId,
    assignedAt: Date.now()
  };

  globalState.festival.assignments.push(assignment);

  return {
    assignment,
    events: [
      {
        type: "FESTIVAL_JURY_ASSIGNED",
        submissionId,
        juryId,
        timestamp: Date.now()
      }
    ]
  };
}

export function listJuryAssignmentsWorkflow(globalState) {
  const assignments = globalState.festival?.assignments || [];
  return { assignments };
}

export function listJuryAssignmentsForUserWorkflow(globalState, userId) {
  const assignments = (globalState.festival?.assignments || []).filter(
    a => a.juryId === userId
  );
  return { assignments };
}

export function submitJuryVoteWorkflow(globalState, { submissionId, score, comment, juryId }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.votes = globalState.festival.votes || [];

  const vote = {
    id: "vote_" + Date.now(),
    submissionId,
    score,
    comment,
    juryId,
    votedAt: Date.now()
  };

  globalState.festival.votes.push(vote);

  return {
    vote,
    events: [
      {
        type: "FESTIVAL_JURY_VOTED",
        submissionId,
        juryId,
        score,
        timestamp: Date.now()
      }
    ]
  };
}
