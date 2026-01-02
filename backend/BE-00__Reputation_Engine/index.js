import express from "express";
import { reputationRouter } from "./api/reputationApi.js";

export const ReputationEngine = express.Router();
ReputationEngine.use("/reputation", reputationRouter);
