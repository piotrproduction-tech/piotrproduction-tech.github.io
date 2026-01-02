import { readJSON } from "../../storage.js";
import path from "path";

export function getAdminOverview(req, res) {
  const file = path.join(process.cwd(), "backend/BE-01__Festival_Engine/data/admin.json");
  const data = readJSON(file);
  res.json(data);
}
