import express from "express";
import { BE_15Api } from "./api/BE-15Api.js";

export const BE_15Module = express.Router();
BE_15Module.use("/be-15", BE_15Api);
