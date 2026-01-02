import express from "express";
import { BE_46Api } from "./api/BE-46Api.js";

export const BE_46Module = express.Router();
BE_46Module.use("/be-46", BE_46Api);
