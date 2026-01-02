import express from "express";
import { BE_45Api } from "./api/BE-45Api.js";

export const BE_45Module = express.Router();
BE_45Module.use("/be-45", BE_45Api);
