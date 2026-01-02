import express from "express";
import { BE_16Api } from "./api/BE-16Api.js";

export const BE_16Module = express.Router();
BE_16Module.use("/be-16", BE_16Api);
