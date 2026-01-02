import express from "express";
import { BE_17Api } from "./api/BE-17Api.js";

export const BE_17Module = express.Router();
BE_17Module.use("/be-17", BE_17Api);
