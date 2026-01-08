import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(__dirname, "DistrictTemplate_12.x");

console.log("📁 Template folder exists:", fs.existsSync(templatePath));

if (fs.existsSync(templatePath)) {
  console.log("📄 Files inside template:");
  console.log(fs.readdirSync(templatePath));
} else {
  console.log("❌ Template folder NOT found");
}
