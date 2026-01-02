import * as service from "./service.js";

export function registerCityHallRoutes(app) {

  app.post("/cityhall/citizen/register", (req, res) => {
    const { userId, name, role } = req.body;
    res.json(service.CityHall_registerCitizen(userId, name, role));
  });

  app.get("/cityhall/citizens", (req, res) => {
    res.json({ list: service.CityHall_getCitizens() });
  });

  app.post("/cityhall/resolution/create", (req, res) => {
    const { userId, title, description } = req.body;
    res.json(service.CityHall_createResolution(userId, title, description));
  });

  app.get("/cityhall/resolutions", (req, res) => {
    res.json({ list: service.CityHall_getResolutions() });
  });

  app.post("/cityhall/meeting/schedule", (req, res) => {
    const { title, ts } = req.body;
    res.json(service.CityHall_scheduleMeeting(title, ts));
  });

  app.get("/cityhall/meetings", (req, res) => {
    res.json({ list: service.CityHall_getMeetings() });
  });

  app.post("/cityhall/link/dao", (req, res) => {
    const { resolutionId, proposalId } = req.body;
    res.json(service.CityHall_linkDAO(resolutionId, proposalId));
  });

  app.get("/cityhall/reports", (req, res) => {
    res.json({ list: service.CityHall_getReports() });
  });
}
