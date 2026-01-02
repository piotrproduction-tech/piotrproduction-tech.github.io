import express from "express";
import { BE_21Api } from "./api/BE-21Api.js";

export const BE_21Module = express.Router();
BE_21Module.use("/be-21", BE_21Api);
