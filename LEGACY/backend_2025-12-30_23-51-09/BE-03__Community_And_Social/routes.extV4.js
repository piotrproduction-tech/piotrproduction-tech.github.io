import * as serviceV4 from "./service.extV4.js";

export function registerCommunityRoutesV4(app) {

  // Trendy inicjatyw
  app.get("/community/v4/trends", (req, res) => {
    res.json({ list: serviceV4.Community_getInitiativeTrends() });
  });

  // Powiadomienia
  app.post("/community/v4/notify/initiative", (req, res) => {
    const { initiativeId, title } = req.body;
    res.json(serviceV4.Community_autoNotifyNewInitiative(initiativeId, title));
  });

  // Integracja z Volunteer Center
  app.post("/community/v4/link/volunteer", (req, res) => {
    const { initiativeId, offerId } = req.body;
    res.json(serviceV4.Community_linkVolunteer(initiativeId, offerId));
  });

  // Raporty uczestnictwa
  app.get("/community/v4/reports", (req, res) => {
    res.json({ list: serviceV4.Community_getParticipationReports() });
  });
}
