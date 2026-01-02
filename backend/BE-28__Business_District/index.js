import express from "express";
import { BE_28Api } from "./api/BE-28Api.js";

export const BE_28Module = express.Router();
BE_28Module.use("/be-28", BE_28Api);
