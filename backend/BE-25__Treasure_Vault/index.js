import express from "express";
import { BE_25Api } from "./api/BE-25Api.js";

export const BE_25Module = express.Router();
BE_25Module.use("/be-25", BE_25Api);
