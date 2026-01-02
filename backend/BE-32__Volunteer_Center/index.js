import express from "express";
import { BE_32Api } from "./api/BE-32Api.js";

export const BE_32Module = express.Router();
BE_32Module.use("/be-32", BE_32Api);
