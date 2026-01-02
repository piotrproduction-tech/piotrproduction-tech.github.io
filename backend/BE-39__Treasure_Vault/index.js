import express from "express";
import { BE_39Api } from "./api/BE-39Api.js";

export const BE_39Module = express.Router();
BE_39Module.use("/be-39", BE_39Api);
