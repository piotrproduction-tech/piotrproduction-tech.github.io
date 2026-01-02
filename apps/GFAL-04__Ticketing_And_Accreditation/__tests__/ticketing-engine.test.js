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