import mongoose, { mongo, Mongoose } from 'mongoose';
import { ProductModel } from "../models/productos.js";

class ContenedorProductosMongoDB {
    constructor(coleccion){
        this.database = mongoose;
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
        let productoBuscado = await ProductModel.find({id:id});
        return productoBuscado;
    }

    async updateById(id, nombre, descripcion, url, precio, stock){
        let prouctoActualizado = await ProductModel.updateOne({id:id},{$set:{nombre: nombre, descripcion: descripcion, url: url, precio: precio, stock: stock}});
        return prouctoActualizado;
    }

    async deleteById(id){
        await ProductModel.deleteOne({id:id});
    }
}



export { ContenedorProductosMongoDB };