// backend/BE-50/routes.js

import * as service from "./service.js";

export function registerAdminRoutes(app) {

  // Użytkownicy
  app.post("/admin/user/add", (req, res) => {
    const { userId, role } = req.body;
    res.json(service.Admin_addUser(userId, role));
  });

  app.get("/admin/users", (req, res) => {
    res.json({ list: service.Admin_getUsers() });
  });

  // Role
  app.post("/admin/role/set", (req, res) => {
    const { userId, role } = req.body;
    res.json(service.Admin_setRole(userId, role));
  });

  app.get("/admin/roles", (req, res) => {
    res.json({ list: service.Admin_getRoles() });
  });

  // Raporty
  app.get("/admin/reports", (req, res) => {
    res.json({ list: service.Admin_getReports() });
  });
}
