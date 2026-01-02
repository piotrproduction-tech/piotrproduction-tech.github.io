import express from "express";
import { BE_13Api } from "./api/BE-13Api.js";

export const BE_13Module = express.Router();
BE_13Module.use("/be-13", BE_13Api);
