import { readJSON, writeJSON } from "../../storage.js";
import path from "path";

export function createSubmission(req, res) {
  const file = path.join(process.cwd(), "backend/BE-01__Festival_Engine/data/submissions.json");
  const data = readJSON(file);

  const newItem = {
    id: String(Date.now()),
    ...req.body
  };

  data.push(newItem);
  writeJSON(file, data);

  res.json({ success: true, id: newItem.id });
}
