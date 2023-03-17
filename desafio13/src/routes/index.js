import express from "express";
import { productRouter } from "./api/product.routes.js";
import { authRouter } from "./api/auth.routes.js";

const router = express.Router();

router.use(productRouter);
router.use(authRouter);

export {router}