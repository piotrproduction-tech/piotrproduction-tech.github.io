import express from "express";
import { BE_36Api } from "./api/BE-36Api.js";

export const BE_36Module = express.Router();
BE_36Module.use("/be-36", BE_36Api);
