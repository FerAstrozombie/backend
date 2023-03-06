import { ContenedorProductosFirebase } from "../../managers/firebase.manager.js";

class ProductFirebaseDao extends ContenedorProductosFirebase {
    constructor(opciones, contenedorColecciones){
        super(opciones, contenedorColecciones)
    }
}

export { ProductFirebaseDao }