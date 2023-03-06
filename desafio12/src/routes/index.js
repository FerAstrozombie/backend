import express from "express";
import { productRouter } from "./api/product.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("bienvenido")
})

router.use(productRouter)

export {router}