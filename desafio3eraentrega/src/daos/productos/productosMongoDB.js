import { ContenedorProductosMongoDB } from "../../managers/ContenedorProductosMongoDB.js";

class ProductosDaosMongo extends ContenedorProductosMongoDB{
    constructor(opciones, coleccion){
        super(opciones, coleccion)
    }
}

export { ProductosDaosMongo }