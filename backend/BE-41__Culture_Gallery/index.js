import express from "express";
import { BE_41Api } from "./api/BE-41Api.js";

export const BE_41Module = express.Router();
BE_41Module.use("/be-41", BE_41Api);
