import * as service from "./service.js";

export function registerSportsArenaRoutes(app) {

  // Wydarzenia
  app.post("/sports/event/add", (req, res) => {
    const { userId, title, description, ts } = req.body;
    res.json(service.Sports_addEvent(userId, title, description, ts));
  });

  app.get("/sports/events", (req, res) => {
    res.json({ list: service.Sports_getEvents() });
  });

  // Harmonogram
  app.post("/sports/schedule", (req, res) => {
    const { eventId, ts } = req.body;
    res.json(service.Sports_scheduleEvent(eventId, ts));
  });

  app.get("/sports/schedule", (req, res) => {
    res.json({ list: service.Sports_getSchedule() });
  });

  // Uczestnicy
  app.post("/sports/participant/register", (req, res) => {
    const { userId, eventId } = req.body;
    res.json(service.Sports_registerParticipant(userId, eventId));
  });

  app.get("/sports/participants/:eventId", (req, res) => {
    res.json({ list: service.Sports_getParticipants(req.params.eventId) });
  });

  // Drużyny
  app.post("/sports/team/add", (req, res) => {
    const { eventId, teamName } = req.body;
    res.json(service.Sports_addTeam(eventId, teamName));
  });

  app.get("/sports/teams/:eventId", (req, res) => {
    res.json({ list: service.Sports_getTeams(req.params.eventId) });
  });

  // Wyniki
  app.post("/sports/result/add", (req, res) => {
    const { eventId, teamId, score } = req.body;
    res.json(service.Sports_addResult(eventId, teamId, score));
  });

  app.get("/sports/results/:eventId", (req, res) => {
    res.json({ list: service.Sports_getResults(req.params.eventId) });
  });

  // Raporty
  app.get("/sports/reports", (req, res) => {
    res.json({ list: service.Sports_getReports() });
  });
}
