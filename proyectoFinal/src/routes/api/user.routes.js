import express from "express";
import { UserController } from "../../controllers/user.controller.js";
import { isAuthenticated } from "./auth.routes.js";

const router = express.Router();

router.get("/", isAuthenticated, UserController.getUsers);
router.get("/:id", isAuthenticated, UserController.getById)
router.post("/", UserController.saveUser)

export {router as usertRouter}
