import express from "express";
import { BE_03Api } from "./api/BE-03Api.js";

export const BE_03Module = express.Router();
BE_03Module.use("/be-03", BE_03Api);
