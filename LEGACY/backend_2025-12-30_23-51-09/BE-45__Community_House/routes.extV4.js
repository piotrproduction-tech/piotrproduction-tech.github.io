import * as serviceV4 from "./service.extV4.js";

export function registerCommunityHouseRoutesV4(app) {

  // Trendy aktywności grup
  app.get("/community-house/v4/trends/groups", (req, res) => {
    res.json({ list: serviceV4.CommunityHouse_groupActivityTrends() });
  });

  // Trendy wolontariatu powiązanego z Community House
  app.get("/community-house/v4/trends/volunteer", (req, res) => {
    const { days } = req.query;
    res.json(serviceV4.CommunityHouse_volunteerTrendReport(Number(days) || 30));
  });

  // Powiadomienia
  app.post("/community-house/v4/notify/event", (req, res) => {
    const { groupId, eventId, title } = req.body;
    res.json(
      serviceV4.CommunityHouse_autoNotifyGroupEvent(groupId, eventId, title)
    );
  });

  // Integracje
  app.post("/community-house/v4/link/community", (req, res) => {
    const { groupId, communityThreadId } = req.body;
    res.json(
      serviceV4.CommunityHouse_linkCommunityGroup(groupId, communityThreadId)
    );
  });

  app.post("/community-house/v4/link/volunteer", (req, res) => {
    const { groupId, volunteerOfferId } = req.body;
    res.json(
      serviceV4.CommunityHouse_linkVolunteerGroup(groupId, volunteerOfferId)
    );
  });

  // Raporty v4
  app.get("/community-house/v4/reports", (req, res) => {
    res.json({ list: serviceV4.CommunityHouse_getAdvancedReports() });
  });
}
// AI: analiza zaangażowania
app.post("/communityhouse/v4/ai/engagement", (req, res) => {
  const { data } = req.body;
  res.json(serviceV4.CH_requestAIEngagementAnalysis(data));
});

// AI: rekomendacje wydarzeń
app.get("/communityhouse/v4/ai/recommend/:userId", (req, res) => {
  res.json(serviceV4.CH_requestAIEventRecommendations(req.params.userId));
});
