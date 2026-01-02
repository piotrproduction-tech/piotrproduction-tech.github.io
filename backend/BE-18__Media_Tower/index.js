import express from "express";
import { BE_18Api } from "./api/BE-18Api.js";

export const BE_18Module = express.Router();
BE_18Module.use("/be-18", BE_18Api);
