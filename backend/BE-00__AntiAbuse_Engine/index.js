import express from "express";
import { abuseRouter } from "./api/abuseApi.js";

export const AntiAbuseEngine = express.Router();
AntiAbuseEngine.use("/abuse", abuseRouter);
