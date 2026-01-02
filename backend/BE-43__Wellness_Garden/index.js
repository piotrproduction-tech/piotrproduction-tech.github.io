import express from "express";
import { BE_43Api } from "./api/BE-43Api.js";

export const BE_43Module = express.Router();
BE_43Module.use("/be-43", BE_43Api);
