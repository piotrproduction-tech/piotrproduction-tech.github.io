import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("📌 __dirname:", __dirname);
console.log("📌 DistrictTemplate_12.x exists:", 
  path.join(__dirname, "DistrictTemplate_12.x")
);
