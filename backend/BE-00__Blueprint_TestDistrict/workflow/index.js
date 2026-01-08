import express from "express";

import { createWorkflow } from "./create.js";
import { updateWorkflow } from "./update.js";
import { deleteWorkflow } from "./delete.js";
import { publishWorkflow } from "./publish.js";
import { archiveWorkflow } from "./archive.js";

export const workflowLayer = express.Router();

workflowLayer.use("/create", createWorkflow);
workflowLayer.use("/update", updateWorkflow);
workflowLayer.use("/delete", deleteWorkflow);
workflowLayer.use("/publish", publishWorkflow);
workflowLayer.use("/archive", archiveWorkflow);
