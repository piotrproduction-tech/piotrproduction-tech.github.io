import express from "express";
import { BE_35Api } from "./api/BE-35Api.js";

export const BE_35Module = express.Router();
BE_35Module.use("/be-35", BE_35Api);
