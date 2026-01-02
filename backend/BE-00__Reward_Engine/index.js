import express from "express";
import { rewardRouter } from "./api/rewardApi.js";

export const RewardEngine = express.Router();
RewardEngine.use("/rewards", rewardRouter);
