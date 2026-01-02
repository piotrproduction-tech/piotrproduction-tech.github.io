import express from "express";
import { FestivalEngine } from "./BE-01__Festival_Engine/index.js";

export function createRouter() {
  const router = express.Router();

  // FESTIVAL ENGINE
  router.use("/festival", FestivalEngine);

  return router;
}


// --- AUTO-INJECT: City Frontend API ---
import { CityFrontendAPI } from "./BE-00__City_Frontend_API/index.js";
app.use("/api", CityFrontendAPI);