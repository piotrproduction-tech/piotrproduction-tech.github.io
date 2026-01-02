import express from "express";
import { BE_27Api } from "./api/BE-27Api.js";

export const BE_27Module = express.Router();
BE_27Module.use("/be-27", BE_27Api);
