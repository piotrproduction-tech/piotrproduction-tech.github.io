import * as serviceV4 from "./service.extV4.js";

export function registerStreamSquareRoutesV4(app) {

  app.get("/stream/v4/trends", (req, res) => {
    res.json({ list: serviceV4.Stream_getTrends() });
  });

  app.post("/stream/v4/notify/new", (req, res) => {
    const { streamId, title } = req.body;
    res.json(serviceV4.Stream_autoNotifyNew(streamId, title));
  });

  app.get("/stream/v4/reports", (req, res) => {
    res.json({ list: serviceV4.Stream_getReportsV4() });
  });
}
