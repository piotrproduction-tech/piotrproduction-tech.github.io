import * as service from "./service.js";

export function registerAdminRoutes(app) {

  app.get("/admin/users", (req, res) => {
    res.json({ list: service.Admin_getUsers() });
  });

  app.post("/admin/user/role", (req, res) => {
    const { userId, role } = req.body;
    res.json(service.Admin_updateUserRole(userId, role));
  });

  app.post("/admin/permissions/set", (req, res) => {
    const { userId, module, level } = req.body;
    res.json(service.Admin_setPermissions(userId, module, level));
  });

  app.get("/admin/permissions/:userId", (req, res) => {
    res.json({ list: service.Admin_getPermissions(req.params.userId) });
  });

  app.get("/admin/logs", (req, res) => {
    res.json({ list: service.Admin_getLogs() });
  });

  app.post("/admin/log/archive", (req, res) => {
    const { logId } = req.body;
    res.json(service.Admin_archiveLog(logId));
  });

  app.post("/admin/link/module", (req, res) => {
    const { moduleId, adminId } = req.body;
    res.json(service.Admin_linkModule(moduleId, adminId));
  });

  app.get("/admin/module-links", (req, res) => {
    res.json({ list: service.Admin_getModuleLinks() });
  });

  app.get("/admin/reports", (req, res) => {
    res.json({ list: service.Admin_getReports() });
  });
}
