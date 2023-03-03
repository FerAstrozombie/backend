import { ProductModel } from "./dbmodels/product.model.js";
import { MyMongoClient } from "./clients/dbClientMongo.js";
import { options } from "../config/config.js"

export async function getApiDao(dbType){
    let ProductManager;
    switch (dbType) {
        case "mysql":
            const { ProductMysqlDao } = await import("./daos/products/producMysqlDao.js");
            ProductManager = new ProductMysqlDao("productos");
            break;
        case "mongo":
            const { ProductMongoDao } = await import("./daos/products/productMongoDao.js");
            const myClient = new MyMongoClient();
            await myClient.connect(options.mongo.url);
            ProductManager = new ProductMongoDao(ProductModel);
        break;
        default:
            break;
    }
    return{ ProductManager }
}