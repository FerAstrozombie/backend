import express from "express";
import { checkUserLoggued } from "../../middlewares/auth.middleware.js";
import { ChatController } from "../../controllers/chat.controller.js"

const router = express.Router();

router.get("/chat", checkUserLoggued, ChatController.getData);

export {router as chatRouter}