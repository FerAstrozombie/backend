import express  from "express";
import { cartController } from "../../controllers/cart.controller.js";

const router = express.Router();

router.get("/carrito", cartController.getCarrito);
router.post("/:id/productos", cartController.addProduct );
router.post("/compra", cartController.getBuy)

export { router as routerCarrito }