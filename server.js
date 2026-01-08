import express from "express";
import { createRouter } from "./backend/router.js";

const app = express();
app.use(express.json());

// 🔥 Serwowanie front-endu FE‑00__City
app.use(express.static("apps/FE-00__City"));

// Router miasta (ładuje FESTIVAL, CITY API, Blueprint itd.)
const router = createRouter();
app.use("/", router);

// Start serwera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`CITYOF-GATE server running on port ${PORT}`);
});
