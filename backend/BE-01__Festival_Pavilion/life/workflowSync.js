import { festivalEventsWorkflow } from "../workflow/events";
import { festivalScheduleWorkflow } from "../workflow/schedule";

export const festivalWorkflowSync = {
  createEvent(name, startsAt, endsAt) {
    return festivalEventsWorkflow.createEvent(name, startsAt, endsAt);
  },
  schedule(eventId, slot) {
    return festivalScheduleWorkflow.addToSchedule(eventId, slot);
  }
};