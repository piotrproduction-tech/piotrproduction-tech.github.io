import express from "express";
import { BE_30Api } from "./api/BE-30Api.js";

export const BE_30Module = express.Router();
BE_30Module.use("/be-30", BE_30Api);
