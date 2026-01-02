import * as service from "./service.js";

export function registerStreamSquareRoutes(app) {

  // Eventy
  app.get("/stream/events", (req, res) => {
    res.json({ list: service.Stream_getEvents() });
  });

  app.post("/stream/event/create", (req, res) => {
    const { userId, title, ts } = req.body;
    res.json(service.Stream_createEvent(userId, title, ts));
  });

  app.post("/stream/event/archive", (req, res) => {
    const { eventId } = req.body;
    res.json(service.Stream_archiveEvent(eventId));
  });

  // Komentarze
  app.post("/stream/comment/add", (req, res) => {
    const { userId, eventId, text } = req.body;
    res.json(service.Stream_addComment(userId, eventId, text));
  });

  app.get("/stream/comments/:eventId", (req, res) => {
    res.json({ list: service.Stream_getComments(req.params.eventId) });
  });

  // Bilety
  app.post("/stream/ticket/add", (req, res) => {
    const { eventId, userId, price } = req.body;
    res.json(service.Stream_addTicket(eventId, userId, price));
  });

  app.get("/stream/tickets/:eventId", (req, res) => {
    res.json({ list: service.Stream_getTickets(req.params.eventId) });
  });

  // Live streams
  app.post("/stream/live/create", (req, res) => {
    const { userId, title, description } = req.body;
    res.json(service.Stream_createLive(userId, title, description));
  });

  app.get("/stream/lives", (req, res) => {
    res.json({ list: service.Stream_getLives() });
  });

  // Harmonogram
  app.post("/stream/live/schedule", (req, res) => {
    const { liveId, ts } = req.body;
    res.json(service.Stream_scheduleLive(liveId, ts));
  });

  app.get("/stream/schedule", (req, res) => {
    res.json({ list: service.Stream_getSchedule() });
  });

  // Uczestnicy
  app.post("/stream/participant/add", (req, res) => {
    const { userId, liveId } = req.body;
    res.json(service.Stream_addParticipant(userId, liveId));
  });

  app.get("/stream/participants/:liveId", (req, res) => {
    res.json({ list: service.Stream_getParticipants(req.params.liveId) });
  });

  // Czat
  app.post("/stream/chat/add", (req, res) => {
    const { userId, liveId, message } = req.body;
    res.json(service.Stream_addChatMessage(userId, liveId, message));
  });

  app.get("/stream/chat/:liveId", (req, res) => {
    res.json({ list: service.Stream_getChat(req.params.liveId) });
  });

  // Integracje
  app.post("/stream/link/channel", (req, res) => {
    const { eventId, channelId } = req.body;
    res.json(service.Stream_linkChannel(eventId, channelId));
  });

  app.post("/stream/link/media", (req, res) => {
    const { liveId, mediaId } = req.body;
    res.json(service.Stream_linkMedia(liveId, mediaId));
  });

  app.post("/stream/link/content", (req, res) => {
    const { contentId, streamId } = req.body;
    res.json(service.Stream_linkContent(contentId, streamId));
  });

  // Raporty legacy
  app.get("/stream/reports/legacy", (req, res) => {
    res.json({ list: service.Stream_getReportsLegacy() });
  });
}
