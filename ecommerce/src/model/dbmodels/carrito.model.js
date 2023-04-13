import mongoose from "mongoose";

const carritosColection = "carritos";

const carritosSchema = new mongoose.Schema(
    {
        productos:{
            type:Array,
        },
    },
{
    timestamps: true
});

export const CartModel = mongoose.model(carritosColection,carritosSchema);