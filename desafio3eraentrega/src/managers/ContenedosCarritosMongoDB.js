import mongoose from "mongoose";
import { CartModel } from "../models/carritos.js";

class ContenedorCarritosMongoDb  {
    constructor(opciones, coleccion){
        this.database = mongoose.connect("mongodb+srv://ferastrozombie:flemita666@ecommerce.amqtcgi.mongodb.net/ecommerce?retryWrites=true&w=majority", opciones);
        this.colection = coleccion;
    }

    async getAll(){
        let carritos = await CartModel.find();
        return carritos;
    }

    async save(carrito){
        let agregarCarrito = await CartModel.insertMany(carrito)
        return agregarCarrito;
    }

    async getById(id){
        let carritoBuscado = await CartModel.find({_id:id}).lean();
        return carritoBuscado;
    }

    async updateById(id, timestamp, productos){
        let carritoActualizado = CartModel.updateOne({_id:id},{$set:{timestamp:timestamp,productos:productos}});
        return carritoActualizado;
    }

    async deleteById(id){
        await CartModel.deleteOne({_id:id});
    }
}

export { ContenedorCarritosMongoDb };