import express from "express";
import { BE_48Api } from "./api/BE-48Api.js";

export const BE_48Module = express.Router();
BE_48Module.use("/be-48", BE_48Api);
