import { ProductModel } from "./dbmodels/product.model.js";
import { CartModel } from "./dbmodels/carrito.model.js";
import { UserModel } from "./dbmodels/user.model.js";
import { ChatModel } from"./dbmodels/chat.model.js";
import { MyMongoClient } from "./clients/dbClientMongo.js";
import { options } from "../config/config.js"

export async function getApiDao(dbType){
    let ProductManager;
    let CartManager;
    let UserManager;
    let ChatManager;
    switch (dbType) {
        case "mysql":
            const { ProductMysqlDao } = await import("./daos/products/producMysqlDao.js");
            ProductManager = new ProductMysqlDao("productos");
            break;
        case "mongo":
            const myClient = new MyMongoClient();
            await myClient.connect(options.mongo.url);
            const { ProductMongoDao } = await import("./daos/products/productMongoDao.js");
            ProductManager = new ProductMongoDao(ProductModel);
            const {CarritoDaosMongo} = await import("./daos/carritos/carritoMongoDB.js");
            CartManager = new CarritoDaosMongo(CartModel);
            const { UserMongoDao } = await import("./daos/users/userMongoDao.js");
            UserManager = new UserMongoDao(UserModel);
            const { ChatsMongoDao } = await import("./daos/chats/chats.MongoDao.js");
            ChatManager = new ChatsMongoDao(ChatManager);
            break;
        case "firebase":
            const { ProductFirebaseDao } = await import("./daos/products/productFirebaseDao.js");
            ProductManager = new ProductFirebaseDao(options.firebase, "ecommercebackend-44699");
            const {  CarritoDaosFirebase} = await import("./daos/carritos/carritoFirebase.js");
            CartManager = new CarritoDaosFirebase(options.firebase, "ecommercebackend-44699")
            break;
        default:
            break;
    }
    return{ ProductManager, CartManager, UserManager, ChatManager }
}