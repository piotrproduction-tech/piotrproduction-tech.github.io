import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODELS
  "models/festival.js": `
export class Festival {
  constructor({ id, name, description, startDate, endDate, mode, visibility }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.mode = mode; // online / onsite / hybrid
    this.visibility = visibility; // public / private / unlisted
  }
}
`,

  "models/film.js": `
export class Film {
  constructor({ id, festivalId, title, synopsis, duration, language, ageRating, streamUrl }) {
    this.id = id;
    this.festivalId = festivalId;
    this.title = title;
    this.synopsis = synopsis;
    this.duration = duration;
    this.language = language;
    this.ageRating = ageRating;
    this.streamUrl = streamUrl;
  }
}
`,

  "models/event.js": `
export class Event {
  constructor({ id, festivalId, type, title, startTime, endTime, streamUrl, location }) {
    this.id = id;
    this.festivalId = festivalId;
    this.type = type; // opening, closing, qna, workshop, live_show
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.streamUrl = streamUrl;
    this.location = location; // kino / scena / online
  }
}
`,

  "models/access.js": `
export class UserAccess {
  constructor({ userId, festivalId, accessType, scope, validFrom, validTo }) {
    this.userId = userId;
    this.festivalId = festivalId;
    this.accessType = accessType; // ticket_single_film, pass_all_films, accreditation_jury, etc.
    this.scope = scope; // optional: { filmId } or { eventId }
    this.validFrom = validFrom;
    this.validTo = validTo;
  }
}
`,

  // ENGINE
  "engine/accessEngine.js": `
export class AccessEngine {
  constructor({ accessList }) {
    this.accessList = accessList;
  }

  _findAccess(userId, festivalId) {
    return this.accessList.filter(a => a.userId === userId && a.festivalId === festivalId);
  }

  canAccessFilm(userId, festivalId, filmId) {
    const access = this._findAccess(userId, festivalId);

    if (access.length === 0) {
      return { allowed: false, reason: "NO_ACCESS" };
    }

    for (const a of access) {
      if (a.accessType === "pass_all_films") return { allowed: true, reason: "OK" };
      if (a.accessType === "ticket_single_film" && a.scope?.filmId === filmId)
        return { allowed: true, reason: "OK" };
      if (a.accessType === "accreditation_jury") return { allowed: true, reason: "OK" };
    }

    return { allowed: false, reason: "NO_TICKET" };
  }

  canAccessEvent(userId, festivalId, eventId) {
    const access = this._findAccess(userId, festivalId);

    if (access.length === 0) {
      return { allowed: false, reason: "NO_ACCESS" };
    }

    for (const a of access) {
      if (a.accessType === "pass_all_events") return { allowed: true, reason: "OK" };
      if (a.accessType === "ticket_single_event" && a.scope?.eventId === eventId)
        return { allowed: true, reason: "OK" };
      if (a.accessType === "accreditation_media") return { allowed: true, reason: "OK" };
    }

    return { allowed: false, reason: "NO_TICKET" };
  }
}
`,

  // TESTS
  "__tests__/access-engine.test.js": `
import { AccessEngine } from "../engine/accessEngine.js";
import { UserAccess } from "../models/access.js";

describe("GFAL Access Engine", () => {
  it("allows access with pass_all_films", () => {
    const access = [
      new UserAccess({
        userId: 1,
        festivalId: 10,
        accessType: "pass_all_films"
      })
    ];

    const engine = new AccessEngine({ accessList: access });
    const result = engine.canAccessFilm(1, 10, 999);

    expect(result.allowed).toBe(true);
  });

  it("denies access without ticket", () => {
    const engine = new AccessEngine({ accessList: [] });
    const result = engine.canAccessFilm(1, 10, 999);

    expect(result.allowed).toBe(false);
  });

  it("allows access to a single film ticket", () => {
    const access = [
      new UserAccess({
        userId: 1,
        festivalId: 10,
        accessType: "ticket_single_film",
        scope: { filmId: 5 }
      })
    ];

    const engine = new AccessEngine({ accessList: access });
    const result = engine.canAccessFilm(1, 10, 5);

    expect(result.allowed).toBe(true);
  });
});
`
};

function generateGFAL() {
  const baseDir = path.join(ROOT, "apps", "GFAL-01__Access_Layer");

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

  console.log("\n🎉 GFAL Access Layer (Krok 1–3) is ready.");
}

generateGFAL();
