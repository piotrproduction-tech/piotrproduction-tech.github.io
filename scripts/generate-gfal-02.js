import fs from "fs";
import path from "path";

const ROOT = path.resolve(".");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const FILES = {
  // MODELE
  "models/festivalSummary.js": `
export class FestivalSummary {
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

  "models/festivalFilters.js": `
export class FestivalFilters {
  constructor({ mode, visibility, dateFrom, dateTo, search }) {
    this.mode = mode; // optional
    this.visibility = visibility; // optional
    this.dateFrom = dateFrom; // optional
    this.dateTo = dateTo; // optional
    this.search = search; // optional text search
  }
}
`,

  // ENGINE
  "engine/catalogEngine.js": `
export class CatalogEngine {
  constructor({ festivals }) {
    this.festivals = festivals; // array of FestivalSummary
  }

  filterFestivals(filters) {
    return this.festivals.filter(f => {
      if (filters.mode && f.mode !== filters.mode) return false;
      if (filters.visibility && f.visibility !== filters.visibility) return false;

      if (filters.dateFrom && new Date(f.startDate) < new Date(filters.dateFrom))
        return false;

      if (filters.dateTo && new Date(f.endDate) > new Date(filters.dateTo))
        return false;

      if (filters.search) {
        const text = filters.search.toLowerCase();
        const match =
          f.name.toLowerCase().includes(text) ||
          f.description.toLowerCase().includes(text);
        if (!match) return false;
      }

      return true;
    });
  }

  sortFestivals(by = "startDate") {
    return [...this.festivals].sort((a, b) => {
      if (by === "startDate") return new Date(a.startDate) - new Date(b.startDate);
      if (by === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }

  getPublicFestivals() {
    return this.festivals.filter(f => f.visibility === "public");
  }
}
`,

  // TESTY
  "__tests__/catalog-engine.test.js": `
import { CatalogEngine } from "../engine/catalogEngine.js";
import { FestivalSummary } from "../models/festivalSummary.js";
import { FestivalFilters } from "../models/festivalFilters.js";

describe("GFAL Festival Catalog Engine", () => {
  const festivals = [
    new FestivalSummary({
      id: 1,
      name: "Poznań Film Gate",
      description: "Main festival",
      startDate: "2026-01-01",
      endDate: "2026-01-10",
      mode: "hybrid",
      visibility: "public"
    }),
    new FestivalSummary({
      id: 2,
      name: "Indie Shorts",
      description: "Independent films",
      startDate: "2026-02-01",
      endDate: "2026-02-05",
      mode: "online",
      visibility: "public"
    }),
    new FestivalSummary({
      id: 3,
      name: "Private Showcase",
      description: "Internal event",
      startDate: "2026-03-01",
      endDate: "2026-03-02",
      mode: "onsite",
      visibility: "private"
    })
  ];

  it("filters by mode", () => {
    const engine = new CatalogEngine({ festivals });
    const filters = new FestivalFilters({ mode: "online" });

    const result = engine.filterFestivals(filters);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe("Indie Shorts");
  });

  it("filters by visibility", () => {
    const engine = new CatalogEngine({ festivals });
    const filters = new FestivalFilters({ visibility: "public" });

    const result = engine.filterFestivals(filters);
    expect(result.length).toBe(2);
  });

  it("searches by text", () => {
    const engine = new CatalogEngine({ festivals });
    const filters = new FestivalFilters({ search: "gate" });

    const result = engine.filterFestivals(filters);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
  });

  it("sorts by start date", () => {
    const engine = new CatalogEngine({ festivals });
    const sorted = engine.sortFestivals("startDate");

    expect(sorted[0].id).toBe(1);
    expect(sorted[1].id).toBe(2);
  });

  it("returns only public festivals", () => {
    const engine = new CatalogEngine({ festivals });
    const result = engine.getPublicFestivals();

    expect(result.length).toBe(2);
  });
});
`
};

function generateGFAL02() {
  const baseDir = path.join(ROOT, "apps", "GFAL-02__Festival_Catalog");

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

  console.log("\n🎉 GFAL‑02 Festival Catalog is ready.");
}

generateGFAL02();
