import { ContenedorProductosFirebase } from "../../managers/ContenedorProductosFirebase.js";

class ProductosDaosFirebase extends ContenedorProductosFirebase{
    constructor(opciones, contenedorColecciones){
        super(opciones, contenedorColecciones)
    }
}

export { ProductosDaosFirebase }