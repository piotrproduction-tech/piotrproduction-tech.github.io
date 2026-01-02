import express from "express";
import { cityFrontendRouter } from "./api/cityFrontendApi.js";

export const CityFrontendAPI = express.Router();
CityFrontendAPI.use("/city", cityFrontendRouter);
