import express from "express";
import { BE_29Api } from "./api/BE-29Api.js";

export const BE_29Module = express.Router();
BE_29Module.use("/be-29", BE_29Api);
