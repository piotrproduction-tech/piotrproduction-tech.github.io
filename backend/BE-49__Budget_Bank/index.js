import express from "express";
import { BE_49Api } from "./api/BE-49Api.js";

export const BE_49Module = express.Router();
BE_49Module.use("/be-49", BE_49Api);
