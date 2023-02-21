import mongoose from "mongoose";

const productosColection = "productos";

const productosSchema = new mongoose.Schema({
    "nombre": String,
    "descripcion": String,
    "url": String,
    "precio": Number,
    "stock": Number,
});

export const ProductModel = mongoose.model(productosColection,productosSchema);