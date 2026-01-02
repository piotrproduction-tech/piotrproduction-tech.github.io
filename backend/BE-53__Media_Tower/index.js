import express from "express";
import { BE_53Api } from "./api/BE-53Api.js";

export const BE_53Module = express.Router();
BE_53Module.use("/be-53", BE_53Api);
