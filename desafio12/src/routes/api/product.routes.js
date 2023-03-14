import express from "express";
import { ProductController } from "../../controllers/product.controller.js";
import { checkUserLoggued } from "../../middlewares/auth.middleware.js"

const router = express.Router();

router.get("/productos", /* checkUserLoggued, */ ProductController.getProducts)
router.post("/productos",/*  checkUserLoggued, */ ProductController.saveProduct);
router.get("/productos/:id"/* , checkUserLoggued */, ProductController.getById);
router.get("/listadeproductos", checkUserLoggued, ProductController.getLista);
router.delete("/productos/:id", ProductController.deleteById)

export {router as productRouter}