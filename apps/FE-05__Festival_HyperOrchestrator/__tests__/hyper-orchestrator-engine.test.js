import { HyperOrchestratorEngine } from "../engine/hyperOrchestratorEngine.js";

describe("FE-05 HyperOrchestrator Engine", () => {
  const mockDirectorEngine = {
    evaluate: jest.fn()
  };

  const mockUiAdapter = {
    promoteFilm: jest.fn(),
    promoteEvent: jest.fn(),
    boostSocialFeed: jest.fn()
  };

  const mockScenarioAdapter = {
    triggerBeat: jest.fn()
  };

  const mockNotificationAdapter = {
    sendEventRescueNotification: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("orchestrates actions from director engine", () => {
    mockDirectorEngine.evaluate.mockReturnValue([
      {
        type: "PROMOTE_FILM",
        priority: 2,
        payload: { filmId: 10 }
      },
      {
        type: "RESCUE_EVENT",
        priority: 1,
        payload: { eventId: 5, strategy: "push_notification" }
      }
    ]);

    const engine = new HyperOrchestratorEngine({
      directorEngine: mockDirectorEngine,
      uiAdapter: mockUiAdapter,
      scenarioAdapter: mockScenarioAdapter,
      notificationAdapter: mockNotificationAdapter
    });

    const actions = engine.orchestrate({
      profileId: "curator",
      insightPacket: { festivalId: 1 }
    });

    expect(actions.length).toBe(2);
    expect(mockUiAdapter.promoteFilm).toHaveBeenCalledWith({ filmId: 10 });
    expect(mockNotificationAdapter.sendEventRescueNotification).toHaveBeenCalledWith({
      eventId: 5,
      strategy: "push_notification"
    });
  });
});