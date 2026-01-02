import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODELE
  "models/ticket.js": `
export class Ticket {
  constructor({ id, userId, festivalId, type, filmId, eventId, validFrom, validTo }) {
    this.id = id;
    this.userId = userId;
    this.festivalId = festivalId;
    this.type = type; // "single_film" | "single_event"
    this.filmId = filmId || null;
    this.eventId = eventId || null;
    this.validFrom = validFrom;
    this.validTo = validTo;
  }
}
`,

  "models/accreditation.js": `
export class Accreditation {
  constructor({ id, userId, festivalId, role, validFrom, validTo }) {
    this.id = id;
    this.userId = userId;
    this.festivalId = festivalId;
    this.role = role; // "media" | "producer" | "jury" | "vip"
    this.validFrom = validFrom;
    this.validTo = validTo;
  }
}
`,

  "models/pass.js": `
export class Pass {
  constructor({ id, userId, festivalId, scope, validFrom, validTo }) {
    this.id = id;
    this.userId = userId;
    this.festivalId = festivalId;
    this.scope = scope; // "all_films" | "all_events" | "full_access"
    this.validFrom = validFrom;
    this.validTo = validTo;
  }
}
`,

  // ENGINE
  "engine/ticketingEngine.js": `
import { UserAccess } from "../../GFAL-01__Access_Layer/models/access.js";

export class TicketingEngine {
  constructor({ tickets, passes, accreditations }) {
    this.tickets = tickets || [];
    this.passes = passes || [];
    this.accreditations = accreditations || [];
  }

  generateAccessForUser(userId, festivalId) {
    const accessList = [];

    const userTickets = this.tickets.filter(
      t => t.userId === userId && t.festivalId === festivalId
    );
    const userPasses = this.passes.filter(
      p => p.userId === userId && p.festivalId === festivalId
    );
    const userAccs = this.accreditations.filter(
      a => a.userId === userId && a.festivalId === festivalId
    );

    for (const t of userTickets) {
      if (t.type === "single_film") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "ticket_single_film",
            scope: { filmId: t.filmId },
            validFrom: t.validFrom,
            validTo: t.validTo
          })
        );
      }

      if (t.type === "single_event") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "ticket_single_event",
            scope: { eventId: t.eventId },
            validFrom: t.validFrom,
            validTo: t.validTo
          })
        );
      }
    }

    for (const p of userPasses) {
      if (p.scope === "all_films") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "pass_all_films",
            scope: null,
            validFrom: p.validFrom,
            validTo: p.validTo
          })
        );
      }

      if (p.scope === "all_events") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "pass_all_events",
            scope: null,
            validFrom: p.validFrom,
            validTo: p.validTo
          })
        );
      }

      if (p.scope === "full_access") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "pass_all_films",
            scope: null,
            validFrom: p.validFrom,
            validTo: p.validTo
          })
        );
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "pass_all_events",
            scope: null,
            validFrom: p.validFrom,
            validTo: p.validTo
          })
        );
      }
    }

    for (const a of userAccs) {
      if (a.role === "jury") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "accreditation_jury",
            scope: null,
            validFrom: a.validFrom,
            validTo: a.validTo
          })
        );
      }

      if (a.role === "media") {
        accessList.push(
          new UserAccess({
            userId,
            festivalId,
            accessType: "accreditation_media",
            scope: null,
            validFrom: a.validFrom,
            validTo: a.validTo
          })
        );
      }
    }

    return accessList;
  }
}
`,

  // TESTY
  "__tests__/ticketing-engine.test.js": `
import { TicketingEngine } from "../engine/ticketingEngine.js";
import { Ticket } from "../models/ticket.js";
import { Pass } from "../models/pass.js";
import { Accreditation } from "../models/accreditation.js";

describe("GFAL Ticketing Engine", () => {
  it("generates access from single film ticket", () => {
    const tickets = [
      new Ticket({
        id: 1,
        userId: 1,
        festivalId: 10,
        type: "single_film",
        filmId: 5,
        validFrom: "2026-01-01",
        validTo: "2026-01-10"
      })
    ];

    const engine = new TicketingEngine({
      tickets,
      passes: [],
      accreditations: []
    });

    const access = engine.generateAccessForUser(1, 10);

    expect(access.length).toBe(1);
    expect(access[0].accessType).toBe("ticket_single_film");
    expect(access[0].scope.filmId).toBe(5);
  });

  it("generates access from full festival pass", () => {
    const passes = [
      new Pass({
        id: 1,
        userId: 2,
        festivalId: 10,
        scope: "full_access",
        validFrom: "2026-01-01",
        validTo: "2026-01-10"
      })
    ];

    const engine = new TicketingEngine({
      tickets: [],
      passes,
      accreditations: []
    });

    const access = engine.generateAccessForUser(2, 10);

    expect(access.length).toBe(2);
    const types = access.map(a => a.accessType).sort();
    expect(types).toEqual(["pass_all_events", "pass_all_films"]);
  });

  it("generates access from jury accreditation", () => {
    const accs = [
      new Accreditation({
        id: 1,
        userId: 3,
        festivalId: 10,
        role: "jury",
        validFrom: "2026-01-01",
        validTo: "2026-01-10"
      })
    ];

    const engine = new TicketingEngine({
      tickets: [],
      passes: [],
      accreditations: accs
    });

    const access = engine.generateAccessForUser(3, 10);

    expect(access.length).toBe(1);
    expect(access[0].accessType).toBe("accreditation_jury");
  });
});
`
};

function generateGFAL04() {
  const baseDir = path.join(ROOT, "apps", "GFAL-04__Ticketing_And_Accreditation");

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

  console.log("\n🎉 GFAL‑04 Ticketing & Accreditation is ready.");
}

generateGFAL04();
