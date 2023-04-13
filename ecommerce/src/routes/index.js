import express from "express";
import { productRouter } from "./api/product.routes.js";
import { authRouter } from "./api/auth.routes.js";
import { cartRouter } from "./api/cart.routes.js";
import { userRouter } from "./api/user.routes.js";
import { chatRouter } from "./api/chat.routes.js";
import { categoryRouter } from "./api/categoria.routes.js"

const router = express.Router();

router.use(productRouter);
router.use(authRouter);
router.use(cartRouter);
router.use(userRouter);
router.use(chatRouter);
router.use(categoryRouter);

export {router}