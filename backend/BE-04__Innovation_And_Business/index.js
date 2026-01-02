import express from "express";
import { BE_04Api } from "./api/BE-04Api.js";

export const BE_04Module = express.Router();
BE_04Module.use("/be-04", BE_04Api);
