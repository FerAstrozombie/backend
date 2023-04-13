import express from "express";
import { checkUserLoggued } from "../../middlewares/auth.middleware.js";
import { CategoryController } from "../../controllers/category.controller.js"

const router = express.Router();

router.get("/:categoria", checkUserLoggued, CategoryController.getProduct)

export {router as categoryRouter}