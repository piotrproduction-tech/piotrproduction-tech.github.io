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