import express from "express";
import { CartController } from "../../controllers/cart.controller.js";
import { checkUserLoggued } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/carritos", checkUserLoggued, CartController.getCarts);
router.delete("/carritos/:id", checkUserLoggued, CartController.deleteCart);
router.get("/carrito/:id", checkUserLoggued, CartController.getCartById);
router.get("/carrito/:id/productos", checkUserLoggued, CartController.productsOnCart);
router.post("/carrito/:id/productos", checkUserLoggued, CartController.addToCart);
router.get("/carrito", checkUserLoggued, CartController.getCart);
router.post("/carrito/compra", checkUserLoggued, CartController.compra);
router.post("/carrito/:id", checkUserLoggued, CartController.deleteProducts);
router.get("/ordenes", checkUserLoggued, CartController.getOrders);
router.post("/eliminar/:id", checkUserLoggued, CartController.deleteProductsOnCart)

export {router as cartRouter}