import express from "express";
import { BE_24Api } from "./api/BE-24Api.js";

export const BE_24Module = express.Router();
BE_24Module.use("/be-24", BE_24Api);
