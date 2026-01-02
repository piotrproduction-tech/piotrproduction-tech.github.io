import express from "express";
import { BE_47Api } from "./api/BE-47Api.js";

export const BE_47Module = express.Router();
BE_47Module.use("/be-47", BE_47Api);
