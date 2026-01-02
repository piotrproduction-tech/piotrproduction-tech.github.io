import express from "express";
import { BE_38Api } from "./api/BE-38Api.js";

export const BE_38Module = express.Router();
BE_38Module.use("/be-38", BE_38Api);
