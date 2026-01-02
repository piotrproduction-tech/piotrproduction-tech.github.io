import { DirectorEngine } from "../engine/directorEngine.js";
import { CuratorProfile } from "../profiles/curator.js";

describe("FE-02 Director Engine", () => {
  it("generates actions based on profile rules", () => {
    const engine = new DirectorEngine({ profiles: [CuratorProfile] });

    const insights = {
      trendingFilms: [
        { filmId: 10, views: 100, avgRating: 4.5 }
      ]
    };

    const actions = engine.evaluate("curator", insights);

    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe("PROMOTE_FILM");
    expect(actions[0].payload.filmId).toBe(10);
  });
});