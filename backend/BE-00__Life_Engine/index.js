import express from "express";
import { lifeRouter } from "./api/lifeApi.js";

export const LifeEngine = express.Router();
LifeEngine.use("/life", lifeRouter);
