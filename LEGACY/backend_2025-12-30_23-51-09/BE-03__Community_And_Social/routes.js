import * as service from "./service.js";

export function registerCommunityRoutes(app) {

  // Dashboard
  app.get("/community/dashboard/:userId", (req, res) => {
    res.json(service.Community_getDashboard(req.params.userId));
  });

  // Raporty
  app.get("/community/reports", (req, res) => {
    const { range } = req.query;
    res.json(service.Community_getReports(range));
  });

  // Wolontariat & programy
  app.get("/community/volunteer/opportunities", (req, res) => {
    res.json({ list: service.Community_getVolunteerOpportunities() });
  });

  app.get("/community/youth/programs", (req, res) => {
    res.json({ list: service.Community_getYouthPrograms() });
  });

  // Posty
  app.post("/community/post/create", (req, res) => {
    const { userId, content } = req.body;
    res.json(service.Community_createPost(userId, content));
  });

  app.post("/community/post/comment", (req, res) => {
    const { postId, userId, text } = req.body;
    res.json(service.Community_comment(postId, userId, text));
  });

  app.post("/community/post/like", (req, res) => {
    const { postId, userId } = req.body;
    res.json(service.Community_like(postId, userId));
  });

  // Zapisy na wydarzenia
  app.post("/community/event/signup", (req, res) => {
    const { eventId, userId } = req.body;
    res.json(service.Community_eventSignup(eventId, userId));
  });

  // Moderacja
  app.post("/community/moderation", (req, res) => {
    const { action, targetId } = req.body;
    res.json(service.Community_moderation(action, targetId));
  });
}
