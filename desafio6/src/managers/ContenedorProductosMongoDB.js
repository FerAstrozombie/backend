import mongoose from "mongoose";
import { ProductModel } from "../models/productos.js";

class ContenedorProductosMongoDB {
    constructor(opciones, coleccion){
        this.database = mongoose.connect("mongodb+srv://ferastrozombie:flemita666@ecommerce.amqtcgi.mongodb.net/ecommerce?retryWrites=true&w=majority", opciones);
        this.colection = coleccion;
    }

    async getAll(){
        let productos = await ProductModel.find();
        return productos;
    }

    async save(producto){
        let agregarProducto = await ProductModel.insertMany(producto);
        return agregarProducto;
    }

    async getById(id){
        let productoBuscado = await ProductModel.find({_id:id});
        return productoBuscado;
    }

    async updateById(id, nombre, descripcion, url, precio, stock){
        let prouctoActualizado = await ProductModel.updateOne({_id:id},{$set:{nombre: nombre, descripcion: descripcion, url: url, precio: precio, stock: stock}});
        return prouctoActualizado;
    }

    async deleteById(id){
        await ProductModel.deleteOne({_id:id});
    }
}



export { ContenedorProductosMongoDB };