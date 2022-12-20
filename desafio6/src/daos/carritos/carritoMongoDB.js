import { ContenedorCarritosMongoDb } from "../../managers/ContenedosCarritosMongoDB.js";

class CarritoDaosMongo extends ContenedorCarritosMongoDb{
    constructor(opciones, coleccion){
        super(opciones, coleccion)
    }
} 

export { CarritoDaosMongo }