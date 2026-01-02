import express from "express";
import { BE_34Api } from "./api/BE-34Api.js";

export const BE_34Module = express.Router();
BE_34Module.use("/be-34", BE_34Api);
