import express from "express"
import { ProductController } from "../../controllers/product.controller.js";
import { isAuthenticated } from "./auth.routes.js";

const router = express.Router();

router.get("/", isAuthenticated, ProductController.getProducts)
router.post("/", ProductController.saveProduct);
router.get("/:id",isAuthenticated, ProductController.getById);


export {router as productRouter}