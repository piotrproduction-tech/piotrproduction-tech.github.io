import express from "express";

import { narrationLife } from "./narration.js";
import { glowLife } from "./glow.js";
import { reactionsLife } from "./reactions.js";
import { notificationsLife } from "./notifications.js";
import { syncLife } from "./sync.js";

export const lifeLayer = express.Router();

lifeLayer.use("/narration", narrationLife);
lifeLayer.use("/glow", glowLife);
lifeLayer.use("/reactions", reactionsLife);
lifeLayer.use("/notifications", notificationsLife);
lifeLayer.use("/sync", syncLife);
