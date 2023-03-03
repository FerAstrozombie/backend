import express from "express";

const router = express.Router();

router.get("/",(req, res)=>{
    res.send("bienvenido")
})

export { router as productRouter };