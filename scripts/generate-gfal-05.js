import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODEL
  "models/userFestivalEntry.js": `
export class UserFestivalEntry {
  constructor({
    festivalId,
    festivalName,
    role,
    hasTickets,
    hasPass,
    hasAccreditation,
    nextEvent,
    status
  }) {
    this.festivalId = festivalId;
    this.festivalName = festivalName;
    this.role = role; // "viewer" | "jury" | "media" | "producer" | "guest"
    this.hasTickets = hasTickets;
    this.hasPass = hasPass;
    this.hasAccreditation = hasAccreditation;
    this.nextEvent = nextEvent || null; // { title, startTime } or null
    this.status = status; // "upcoming" | "ongoing" | "ended"
  }
}
`,

  // ENGINE
  "engine/userDashboardEngine.js": `
import { UserFestivalEntry } from "../models/userFestivalEntry.js";

export class UserDashboardEngine {
  constructor({ festivals, ticketingEngine, accessEngine, eventRepository }) {
    this.festivals = festivals; // array of { id, name, startDate, endDate }
    this.ticketingEngine = ticketingEngine;
    this.accessEngine = accessEngine;
    this.eventRepository = eventRepository;
  }

  _getFestivalStatus(festival) {
    const now = new Date();
    const start = new Date(festival.startDate);
    const end = new Date(festival.endDate);

    if (now < start) return "upcoming";
    if (now > end) return "ended";
    return "ongoing";
  }

  buildUserDashboard(userId) {
    const entries = [];

    for (const fest of this.festivals) {
      const accessList = this.ticketingEngine.generateAccessForUser(
        userId,
        fest.id
      );

      const hasTickets = accessList.some(a =>
        a.accessType === "ticket_single_film" ||
        a.accessType === "ticket_single_event"
      );

      const hasPass = accessList.some(a =>
        a.accessType === "pass_all_films" ||
        a.accessType === "pass_all_events"
      );

      const hasAccreditation = accessList.some(a =>
        a.accessType === "accreditation_jury" ||
        a.accessType === "accreditation_media"
      );

      const status = this._getFestivalStatus(fest);

      let nextEvent = null;
      if (this.eventRepository && this.eventRepository.getUpcomingEventsForUser) {
        const upcoming = this.eventRepository.getUpcomingEventsForUser(
          userId,
          fest.id
        );
        if (upcoming && upcoming.length > 0) {
          const first = upcoming[0];
          nextEvent = {
            title: first.title,
            startTime: first.startTime
          };
        }
      }

      const role = hasAccreditation ? "jury" : hasPass || hasTickets ? "viewer" : "guest";

      entries.push(
        new UserFestivalEntry({
          festivalId: fest.id,
          festivalName: fest.name,
          role,
          hasTickets,
          hasPass,
          hasAccreditation,
          nextEvent,
          status
        })
      );
    }

    return entries;
  }
}
`,

  // TESTY
  "__tests__/user-dashboard-engine.test.js": `
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
`
};

function generateGFAL05() {
  const baseDir = path.join(ROOT, "apps", "GFAL-05__User_Festival_Dashboard");

  Object.entries(FILES).forEach(([relativePath, content]) => {
    const filePath = path.join(baseDir, relativePath);
    const dir = path.dirname(filePath);

    ensureDir(dir);

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content.trim(), "utf8");
      console.log("✔ Created:", filePath);
    } else {
      console.log("⏭ Skipped (exists):", filePath);
    }
  });

  console.log("\n🎉 GFAL‑05 User Festival Dashboard is ready.");
}

generateGFAL05();
