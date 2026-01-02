import express from "express";
import { BE_33Api } from "./api/BE-33Api.js";

export const BE_33Module = express.Router();
BE_33Module.use("/be-33", BE_33Api);
