import { readJSON } from "../../storage.js";
import path from "path";

export function getSubmissionById(req, res) {
  const file = path.join(process.cwd(), "backend/BE-01__Festival_Engine/data/submissions.json");
  const data = readJSON(file);
  const item = data.find((x) => x.id === req.params.id);
  res.json(item || null);
}
