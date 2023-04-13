import mongoose from "mongoose";

const ordenesColection = "ordenes";

const ordenesSchema = new mongoose.Schema(
    {
        nombre:{
            type:String,
        },
        apellido:{
            type:String,
        },
        email:{
            type:String,
        },
        productos: {
            type: Array
        }
    },
{
    timestamps: true
});

export const OrdenModel = mongoose.model(ordenesColection,ordenesSchema);