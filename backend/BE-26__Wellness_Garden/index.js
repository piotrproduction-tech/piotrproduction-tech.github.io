import express from "express";
import { BE_26Api } from "./api/BE-26Api.js";

export const BE_26Module = express.Router();
BE_26Module.use("/be-26", BE_26Api);
