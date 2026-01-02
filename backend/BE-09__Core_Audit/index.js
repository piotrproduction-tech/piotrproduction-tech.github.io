import express from "express";
import { BE_09Api } from "./api/BE-09Api.js";

export const BE_09Module = express.Router();
BE_09Module.use("/be-09", BE_09Api);
