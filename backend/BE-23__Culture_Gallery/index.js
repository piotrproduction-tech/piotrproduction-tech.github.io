import express from "express";
import { BE_23Api } from "./api/BE-23Api.js";

export const BE_23Module = express.Router();
BE_23Module.use("/be-23", BE_23Api);
