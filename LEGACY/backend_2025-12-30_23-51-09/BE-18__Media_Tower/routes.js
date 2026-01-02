import * as service from "./service.js";

export function registerMediaRoutes(app) {

  app.post("/media/announcement/publish", (req, res) => {
    const { userId, title, content } = req.body;
    res.json(service.Media_publishAnnouncement(userId, title, content));
  });

  app.get("/media/announcements", (req, res) => {
    res.json({ list: service.Media_getAnnouncements() });
  });

  app.post("/media/channel/create", (req, res) => {
    const { userId, name } = req.body;
    res.json(service.Media_createChannel(userId, name));
  });

  app.get("/media/channels", (req, res) => {
    res.json({ list: service.Media_getChannels() });
  });

  app.post("/media/social/link", (req, res) => {
    const { channelId, platform } = req.body;
    res.json(service.Media_linkSocial(channelId, platform));
  });

  app.get("/media/social/:channelId", (req, res) => {
    res.json({ list: service.Media_getSocialLinks(req.params.channelId) });
  });

  app.post("/media/live/start", (req, res) => {
    const { channelId, title } = req.body;
    res.json(service.Media_startLive(channelId, title));
  });

  app.get("/media/live/:channelId", (req, res) => {
    res.json({ list: service.Media_getLiveSessions(req.params.channelId) });
  });

  app.post("/media/announcement/archive", (req, res) => {
    const { announcementId } = req.body;
    res.json(service.Media_archiveAnnouncement(announcementId));
  });

  app.get("/media/reports", (req, res) => {
    res.json({ list: service.Media_getReports() });
  });
}
