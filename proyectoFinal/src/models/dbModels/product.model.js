import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    descripcion:{
        type: String,
        require: true
    },
    url:{
        type: String,
        require:true
    },
    precio:{
        type: Number,
        require:true
    },
    stock:{
        type: Number,
        require:true
    }
},
{
    timestamps: true
});


const ProductModel = mongoose.model(productsCollection, productsSchema);

export { ProductModel }