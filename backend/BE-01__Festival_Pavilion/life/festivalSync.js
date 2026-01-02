import { festivalSubmissionsWorkflow } from "../workflow/submissions";
import { festivalJuryWorkflow } from "../workflow/jury";
import { festivalAwardsWorkflow } from "../workflow/awards";

export const festivalSync = {
  handleSubmissionCreated(payload) {
    return festivalSubmissionsWorkflow.createSubmission(payload);
  },
  handleJuryVote(payload) {
    return festivalJuryWorkflow.recordVote(
      payload.submissionId,
      payload.juryId,
      payload.score,
      payload.comment
    );
  },
  handleAwardGranted(payload) {
    return festivalAwardsWorkflow.grantAward(
      payload.categoryId,
      payload.submissionId
    );
  }
};