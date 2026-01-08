import express from "express";
import { FestivalEngine } from "./BE-01__Festival_Engine/index.js";
import { CityFrontendAPI } from "./BE-00__City_Frontend_API/index.js";
import { BlueprintTestDistrict } from "./BE-00__BLUEPRINT_TESTDISTRICT/index.js";


export function createRouter() {
  const router = express.Router();

  // FESTIVAL ENGINE
  router.use("/festival", FestivalEngine);

  // CITY FRONTEND API
  router.use("/api", CityFrontendAPI);

  // BLUEPRINT TEST DISTRICT
  router.use("/blueprint-test", BlueprintTestDistrict);

  return router;
}