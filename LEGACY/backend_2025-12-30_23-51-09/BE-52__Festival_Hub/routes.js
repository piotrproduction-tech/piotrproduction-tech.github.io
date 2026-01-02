import * as service from "./service.js";

export function registerFestivalRoutes(app) {

  // ===== Wydarzenia =====
  app.post("/festival/event/add", (req, res) => {
    const { title, description, ts } = req.body;
    res.json(service.Festival_addEvent(title, description, ts));
  });

  app.get("/festival/events", (req, res) => {
    res.json({ list: service.Festival_getEvents() });
  });

  // ===== Bilety =====
  app.post("/festival/ticket/add", (req, res) => {
    const { eventId, userId, type } = req.body;
    res.json(service.Festival_addTicket(eventId, userId, type));
  });

  app.get("/festival/tickets/:eventId", (req, res) => {
    res.json({ list: service.Festival_getTickets(req.params.eventId) });
  });

  // ===== Partnerzy =====
  app.post("/festival/partner/add", (req, res) => {
    const { name, contribution } = req.body;
    res.json(service.Festival_addPartner(name, contribution));
  });

  app.get("/festival/partners", (req, res) => {
    res.json({ list: service.Festival_getPartners() });
  });

  // ===== Raporty =====
  app.get("/festival/reports", (req, res) => {
    res.json({ list: service.Festival_getReports() });
  });
}
