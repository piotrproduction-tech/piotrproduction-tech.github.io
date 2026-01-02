import express from "express";
import { BE_02Api } from "./api/BE-02Api.js";

export const BE_02Module = express.Router();
BE_02Module.use("/be-02", BE_02Api);
