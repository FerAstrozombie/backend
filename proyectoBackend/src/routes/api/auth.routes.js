import express from "express";
import { AuthController } from "../../controllers/auth.controller.js"

const router = express.Router();

router.post("/registro", AuthController.postSignupPassport, AuthController.postSignup);
router.get("/logout", AuthController.logout);
router.get("/registro", AuthController.getRegistro);
router.post("/login", AuthController.postLoginPassport, AuthController.postSignup);
router.get("/login", AuthController.getLogin);
router.get("/", AuthController.getPerfil);

export {router as authRouter};