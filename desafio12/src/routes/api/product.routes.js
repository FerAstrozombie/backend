import express from "express";
import { ProductController } from "../../controllers/product.controller.js"

const router = express.Router();

router.get("/productos", ProductController.getProducts)
router.post("/", ProductController.saveProduct);
router.get("/productos/:id", ProductController.getById)
router.get("/listadeproductos", ProductController.getLista)

export {router as productRouter}