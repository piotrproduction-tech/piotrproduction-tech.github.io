import express from "express";
import { BE_54Api } from "./api/BE-54Api.js";

export const BE_54Module = express.Router();
BE_54Module.use("/be-54", BE_54Api);
