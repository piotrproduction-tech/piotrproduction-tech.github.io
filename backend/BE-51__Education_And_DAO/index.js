import express from "express";
import { BE_51Api } from "./api/BE-51Api.js";

export const BE_51Module = express.Router();
BE_51Module.use("/be-51", BE_51Api);
