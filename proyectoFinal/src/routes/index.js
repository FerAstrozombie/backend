import express from "express"
import { productRouter } from "./api/product.routes.js";
import { usertRouter } from "./api/user.routes.js";
import { authRouter } from "./api/auth.routes.js";
import { routerCarrito } from "./api/cart.routes.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("bienvenido")
})

router.use("/productos", productRouter)
router.use("/user", usertRouter)
router.use("/", authRouter)
router.use("/", routerCarrito)

export {router}