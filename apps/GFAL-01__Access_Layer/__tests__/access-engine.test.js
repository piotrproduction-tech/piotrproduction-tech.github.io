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