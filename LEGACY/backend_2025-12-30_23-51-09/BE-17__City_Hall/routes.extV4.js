import * as serviceV4 from "./service.extV4.js";

export function registerCityHallRoutesV4(app) {

  app.get("/cityhall/v4/trends", (req, res) => {
    res.json({ list: serviceV4.CityHall_getResolutionTrends() });
  });

  app.post("/cityhall/v4/notify/resolution", (req, res) => {
    const { resId, title } = req.body;
    res.json(serviceV4.CityHall_autoNotifyNewResolution(resId, title));
  });

  app.post("/cityhall/v4/link/governance", (req, res) => {
    const { resId, govId } = req.body;
    res.json(serviceV4.CityHall_linkGovernance(resId, govId));
  });

  app.get("/cityhall/v4/reports", (req, res) => {
    res.json({ list: serviceV4.CityHall_getReportsV4() });
  });
}
