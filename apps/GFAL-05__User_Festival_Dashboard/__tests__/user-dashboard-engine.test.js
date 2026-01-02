import { UserDashboardEngine } from "../engine/userDashboardEngine.js";

describe("GFAL User Festival Dashboard Engine", () => {
  const festivals = [
    {
      id: 10,
      name: "Poznań Film Gate",
      startDate: "2026-01-01",
      endDate: "2026-01-10"
    },
    {
      id: 20,
      name: "Indie Shorts",
      startDate: "2026-02-01",
      endDate: "2026-02-05"
    }
  ];

  const mockTicketingEngine = {
    generateAccessForUser: jest.fn()
  };

  const mockEventRepository = {
    getUpcomingEventsForUser: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("builds dashboard entries with basic access info", () => {
    mockTicketingEngine.generateAccessForUser.mockImplementation((userId, festivalId) => {
      if (festivalId === 10) {
        return [
          { accessType: "pass_all_films" },
          { accessType: "accreditation_jury" }
        ];
      }
      return [];
    });

    mockEventRepository.getUpcomingEventsForUser.mockReturnValue([
      { title: "Opening Gala", startTime: "2026-01-01T18:00:00Z" }
    ]);

    const engine = new UserDashboardEngine({
      festivals,
      ticketingEngine: mockTicketingEngine,
      accessEngine: null,
      eventRepository: mockEventRepository
    });

    const dashboard = engine.buildUserDashboard(1);

    expect(dashboard.length).toBe(2);

    const fest10 = dashboard.find(d => d.festivalId === 10);
    expect(fest10.hasPass).toBe(true);
    expect(fest10.hasAccreditation).toBe(true);
    expect(fest10.role).toBe("jury");
    expect(fest10.nextEvent).not.toBeNull();

    const fest20 = dashboard.find(d => d.festivalId === 20);
    expect(fest20.hasPass).toBe(false);
    expect(fest20.hasAccreditation).toBe(false);
  });
});