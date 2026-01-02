import express from "express";
import { BE_06Api } from "./api/BE-06Api.js";

export const BE_06Module = express.Router();
BE_06Module.use("/be-06", BE_06Api);
