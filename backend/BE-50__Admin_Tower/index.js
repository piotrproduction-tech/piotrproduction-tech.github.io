import express from "express";
import { BE_50Api } from "./api/BE-50Api.js";

export const BE_50Module = express.Router();
BE_50Module.use("/be-50", BE_50Api);
