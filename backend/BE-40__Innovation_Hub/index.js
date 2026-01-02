import express from "express";
import { BE_40Api } from "./api/BE-40Api.js";

export const BE_40Module = express.Router();
BE_40Module.use("/be-40", BE_40Api);
