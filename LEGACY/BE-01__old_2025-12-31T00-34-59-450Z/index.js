import express from "express";
import { getSubmissions } from "./api/getSubmissions.js";
import { getSubmissionById } from "./api/getSubmissionById.js";
import { createSubmission } from "./api/createSubmission.js";
import { getJuryDashboardData } from "./api/getJuryDashboardData.js";
import { getAIAnalysisOverview } from "./api/getAIAnalysisOverview.js";
import { getAdminOverview } from "./api/getAdminOverview.js";

export const FestivalEngine = express.Router();

FestivalEngine.get("/getSubmissions", getSubmissions);
FestivalEngine.get("/getSubmissionById/:id", getSubmissionById);
FestivalEngine.post("/createSubmission", createSubmission);
FestivalEngine.get("/getJuryDashboardData", getJuryDashboardData);
FestivalEngine.get("/getAIAnalysisOverview", getAIAnalysisOverview);
FestivalEngine.get("/getAdminOverview", getAdminOverview);
