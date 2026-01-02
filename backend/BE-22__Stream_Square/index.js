import express from "express";
import { BE_22Api } from "./api/BE-22Api.js";

export const BE_22Module = express.Router();
BE_22Module.use("/be-22", BE_22Api);
