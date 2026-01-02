import express from "express";
import { BE_44Api } from "./api/BE-44Api.js";

export const BE_44Module = express.Router();
BE_44Module.use("/be-44", BE_44Api);
