import mongoose from "mongoose";

const productosColection = "productos";

const productosSchema = new mongoose.Schema(
    {
        nombre:{
            type:String,
            required:true
        },
        descripcion:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
        precio:{
            type: Number,
            required:true,
        },
        stock:{
            type: Number,
            required:true,
        },
    },
{
    timestamps: true
});

export const ProductModel = mongoose.model(productosColection,productosSchema);