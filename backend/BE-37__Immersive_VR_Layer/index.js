import express from "express";
import { BE_37Api } from "./api/BE-37Api.js";

export const BE_37Module = express.Router();
BE_37Module.use("/be-37", BE_37Api);
