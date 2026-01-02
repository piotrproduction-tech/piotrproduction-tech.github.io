import * as serviceV4 from "./service.extV4.js";

export function registerMediaRoutesV4(app) {

  app.get("/media/v4/trends", (req, res) => {
    res.json({ list: serviceV4.Media_getPublicationTrends() });
  });

  app.post("/media/v4/notify/new", (req, res) => {
    const { contentId, title } = req.body;
    res.json(serviceV4.Media_autoNotifyNewContent(contentId, title));
  });

  app.post("/media/v4/link/stream", (req, res) => {
    const { contentId, streamId } = req.body;
    res.json(serviceV4.Media_linkStreamSquare(contentId, streamId));
  });

  app.get("/media/v4/reports", (req, res) => {
    res.json({ list: serviceV4.Media_getReportsV4() });
  });
}
