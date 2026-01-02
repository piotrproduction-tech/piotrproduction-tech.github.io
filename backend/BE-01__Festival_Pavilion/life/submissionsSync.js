import { festivalSubmissionsWorkflow } from "../workflow/submissions";

export const submissionsSync = {
  submit(payload) {
    return festivalSubmissionsWorkflow.createSubmission(payload);
  },
  updateStatus(submission, status) {
    return festivalSubmissionsWorkflow.updateStatus(submission, status);
  }
};


// LIFE_SUBMISSIONS_SYNC
// Sync layer for submissions workflow

import {
  createSubmissionWorkflow,
  listSubmissionsWorkflow,
  getSubmissionDetailsWorkflow
} from "../workflow/submissions";

export const submissionsSync = {
  create(globalState, payload) {
    return createSubmissionWorkflow(globalState, payload);
  },
  list(globalState) {
    return listSubmissionsWorkflow(globalState);
  },
  details(globalState, id) {
    return getSubmissionDetailsWorkflow(globalState, id);
  }
};
