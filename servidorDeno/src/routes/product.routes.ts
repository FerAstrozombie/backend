import { Router } from "../../depts.ts";
import {findProducts, findProductById, createProduct, deleteProduct} from "../controllers/product.controller.ts";

export const productRouter = new Router()
.get("/products",findProducts)
.get("/products/:id", findProductById)
.post("/products",createProduct)
.delete("/products/:id", deleteProduct)