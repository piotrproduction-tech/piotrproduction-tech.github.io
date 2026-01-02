import express from "express";
import { BE_42Api } from "./api/BE-42Api.js";

export const BE_42Module = express.Router();
BE_42Module.use("/be-42", BE_42Api);
