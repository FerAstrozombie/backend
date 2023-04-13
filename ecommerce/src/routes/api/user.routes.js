import express from "express";
import { checkUserLoggued } from "../../middlewares/auth.middleware.js";
import { UserController } from "../../controllers/user.controller.js";

const router = express.Router();

router.get("/editPerfil/:id", checkUserLoggued, UserController.getPerfil);
router.post("/edit", checkUserLoggued, UserController.updatePerfil)

export {router as userRouter}