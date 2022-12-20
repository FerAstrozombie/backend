import mongoose from "mongoose";

const carritosColection = "carritos";

const carritosSchema = new mongoose.Schema({
    "productos": Array,
    "timestamp": String,
});

export const CartModel = mongoose.model(carritosColection,carritosSchema);