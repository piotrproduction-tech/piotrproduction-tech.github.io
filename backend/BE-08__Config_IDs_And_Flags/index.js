import express from "express";
import { BE_08Api } from "./api/BE-08Api.js";

export const BE_08Module = express.Router();
BE_08Module.use("/be-08", BE_08Api);
