import { options } from "../config/databaseConfig.js"

let ContenedorDaoProductos;
let ContenedorDaoCarritos;

let databaseType = "mongo";

switch(databaseType){
    case "mongo":
        const { ProductosDaosMongo } = await import("./productos/productosMongoDB.js");
        const { CarritoDaosMongo } = await import("./carritos/carritoMongoDB.js");
        ContenedorDaoProductos = new ProductosDaosMongo(options.mongoDB,"ecommerce")
        ContenedorDaoCarritos = new CarritoDaosMongo(options.mongoDB,"ecommerce")
    break;

    case "firebase":
        const { ProductosDaosFirebase } = await import("./productos/productosFirebase.js");
        const { CarritoDaosFirebase } = await import("./carritos/carritoFirebase.js")
        ContenedorDaoProductos = new ProductosDaosFirebase(options.firebase,"ecommercebackend-44699")
        ContenedorDaoCarritos = new CarritoDaosFirebase(options.firebase,"ecommercebackend-44699")
    break;
}

export{ ContenedorDaoProductos, ContenedorDaoCarritos }