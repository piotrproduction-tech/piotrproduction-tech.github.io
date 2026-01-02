import express from "express";
import { eventBusRouter } from "./api/eventBusApi.js";

export const EventBusEngine = express.Router();
EventBusEngine.use("/events", eventBusRouter);
