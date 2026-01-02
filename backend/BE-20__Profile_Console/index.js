import express from "express";
import { BE_20Api } from "./api/BE-20Api.js";

export const BE_20Module = express.Router();
BE_20Module.use("/be-20", BE_20Api);
