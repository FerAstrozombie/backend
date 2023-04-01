import express from "express";
import { authRouter } from "./api/auth.routes.js";

const router = express.Router();

router.use(authRouter);

export {router}