import * as service from "./service.js";

export function registerCommunityHouseRoutes(app) {

  // Grupy
  app.post("/community-house/group/add", (req, res) => {
    const { name, actor } = req.body;
    res.json(service.CommunityHouse_addGroup(name, actor));
  });

  app.post("/community-house/group/remove", (req, res) => {
    const { id, actor } = req.body;
    res.json(service.CommunityHouse_removeGroup(id, actor));
  });

  app.get("/community-house/groups", (req, res) => {
    res.json({ list: service.CommunityHouse_getGroups() });
  });

  // Członkowie
  app.post("/community-house/group/member/add", (req, res) => {
    const { groupId, userId, name } = req.body;
    res.json(service.CommunityHouse_addMember(groupId, userId, name));
  });

  app.get("/community-house/group/members/:groupId", (req, res) => {
    res.json(service.CommunityHouse_getMembers(req.params.groupId));
  });

  // Treści
  app.post("/community-house/group/content/add", (req, res) => {
    const { groupId, contentId, text, authorId } = req.body;
    res.json(
      service.CommunityHouse_addContent(groupId, contentId, text, authorId)
    );
  });

  // Moderacja
  app.post("/community-house/group/content/moderate", (req, res) => {
    const { groupId, contentId, action, actor } = req.body;
    res.json(
      service.CommunityHouse_moderateContent(
        groupId,
        contentId,
        action,
        actor
      )
    );
  });

  app.post("/community-house/group/content/review", (req, res) => {
    const { groupId, contentId, reviewer, decision } = req.body;
    res.json(
      service.CommunityHouse_reviewContent(
        groupId,
        contentId,
        reviewer,
        decision
      )
    );
  });

  // Raporty
  app.get("/community-house/group/report/:groupId", (req, res) => {
    res.json(service.CommunityHouse_activityReport(req.params.groupId));
  });

  app.get("/community-house/group/dashboard/:groupId", (req, res) => {
    res.json({ list: service.CommunityHouse_dashboardData(req.params.groupId) });
  });

  // Moderacja z polityką (placeholder)
  app.post("/community-house/group/content/moderate/policy", (req, res) => {
    const { groupId, contentId, reviewerRole, decision } = req.body;
    res.json(
      service.CommunityHouse_moderationWithPolicy(
        groupId,
        contentId,
        reviewerRole,
        decision
      )
    );
  });
}
