import express from "express";
import { BE_01Api } from "./api/BE-01Api.js";

export const BE_01Module = express.Router();
BE_01Module.use("/be-01", BE_01Api);
