import express from "express";
import { BE_52Api } from "./api/BE-52Api.js";

export const BE_52Module = express.Router();
BE_52Module.use("/be-52", BE_52Api);
