import * as service from "./service.js";

export function registerVolunteerRoutes(app) {

  // Zadania
  app.post("/volunteer/task/add", (req, res) => {
    const { task, volunteer, actor } = req.body;
    res.json(service.Volunteer_addTask(task, volunteer, actor));
  });

  app.post("/volunteer/task/remove", (req, res) => {
    const { id, actor } = req.body;
    res.json(service.Volunteer_removeTask(id, actor));
  });

  app.get("/volunteer/tasks", (req, res) => {
    res.json({ list: service.Volunteer_getTasks() });
  });

  // Statusy
  app.post("/volunteer/task/status", (req, res) => {
    const { taskId, status, actor } = req.body;
    res.json(service.Volunteer_updateStatus(taskId, status, actor));
  });

  // Raport godzin
  app.get("/volunteer/report/hours/:volunteer", (req, res) => {
    res.json(service.Volunteer_reportHours(req.params.volunteer));
  });

  // Oferty wolontariatu
  app.get("/volunteer/opportunities", (req, res) => {
    res.json({ list: service.Volunteer_getOpportunities() });
  });
}
