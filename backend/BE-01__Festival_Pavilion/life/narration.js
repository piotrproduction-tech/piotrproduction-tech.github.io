import { cityNarrative } from "../../apps/FE-00__City/narrative/cityNarrativeEngine";

export const festivalNarration = {
  recordSubmissionStory(submission) {
    cityNarrative.stories.push({
      text: `Nowe zgłoszenie festiwalowe: ${submission.title || submission.id}.`,
      timestamp: Date.now()
    });
  },
  recordAwardStory(award) {
    cityNarrative.stories.push({
      text: `Przyznano nagrodę w kategorii ${award.categoryId}.`,
      timestamp: Date.now()
    });
  }
};


// LIFE_NARRATION_ENGINE
// Narrative engine for Festival Pavilion

export const festivalNarration = {
  record(globalState, event) {
    globalState.festival = globalState.festival || {};
    globalState.festival.narrative = globalState.festival.narrative || [];

    const story = this.toStory(event);
    if (story) {
      globalState.festival.narrative.push({
        text: story,
        timestamp: Date.now()
      });
    }
  },

  toStory(event) {
    switch (event.type) {
      case "FESTIVAL_SUBMISSION_CREATED":
        return "Nowe zgłoszenie festiwalowe zostało dodane.";

      case "FESTIVAL_JURY_ASSIGNED":
        return "Zgłoszenie zostało przydzielone jurorowi.";

      case "FESTIVAL_JURY_VOTED":
        return "Juror oddał głos na zgłoszenie.";

      case "FESTIVAL_AWARD_CATEGORY_CREATED":
        return "Utworzono nową kategorię nagrody.";

      case "FESTIVAL_AWARD_GRANTED":
        return "Przyznano nagrodę festiwalową.";

      case "FESTIVAL_EVENT_CREATED":
        return "Dodano nowe wydarzenie festiwalowe.";

      case "FESTIVAL_EVENT_UPDATED":
        return "Zaktualizowano wydarzenie festiwalowe.";

      case "FESTIVAL_SCHEDULE_ENTRY_ADDED":
        return "Dodano pozycję do harmonogramu.";

      default:
        return null;
    }
  }
};
