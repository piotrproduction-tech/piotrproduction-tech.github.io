import { festivalJuryWorkflow } from "../workflow/jury";

export const jurySync = {
  assign(submissionId, juryId) {
    return festivalJuryWorkflow.assignToJury(submissionId, juryId);
  }
};


// LIFE_JURY_SYNC
// Sync layer for jury workflow

import {
  listJuryMembersWorkflow,
  assignSubmissionToJuryWorkflow,
  listJuryAssignmentsWorkflow,
  listJuryAssignmentsForUserWorkflow,
  submitJuryVoteWorkflow
} from "../workflow/jury";

export const jurySync = {
  list(globalState) {
    return listJuryMembersWorkflow(globalState);
  },
  assign(globalState, payload) {
    return assignSubmissionToJuryWorkflow(globalState, payload);
  },
  assignments(globalState) {
    return listJuryAssignmentsWorkflow(globalState);
  },
  assignmentsForUser(globalState, userId) {
    return listJuryAssignmentsForUserWorkflow(globalState, userId);
  },
  vote(globalState, payload) {
    return submitJuryVoteWorkflow(globalState, payload);
  }
};
