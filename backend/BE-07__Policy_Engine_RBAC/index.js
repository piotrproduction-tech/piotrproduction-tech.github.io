import express from "express";
import { BE_07Api } from "./api/BE-07Api.js";

export const BE_07Module = express.Router();
BE_07Module.use("/be-07", BE_07Api);
