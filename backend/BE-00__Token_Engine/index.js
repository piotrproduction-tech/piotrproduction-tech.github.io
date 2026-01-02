import express from "express";
import { tokenRouter } from "./api/tokenApi.js";

export const TokenEngine = express.Router();
TokenEngine.use("/tokens", tokenRouter);
