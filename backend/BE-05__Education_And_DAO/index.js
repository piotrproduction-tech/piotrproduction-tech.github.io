import express from "express";
import { BE_05Api } from "./api/BE-05Api.js";

export const BE_05Module = express.Router();
BE_05Module.use("/be-05", BE_05Api);
