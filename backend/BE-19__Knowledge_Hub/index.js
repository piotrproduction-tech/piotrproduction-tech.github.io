import express from "express";
import { BE_19Api } from "./api/BE-19Api.js";

export const BE_19Module = express.Router();
BE_19Module.use("/be-19", BE_19Api);
