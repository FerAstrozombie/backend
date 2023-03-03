import { MongoContainer } from "./managers/mongo.manager.js";
import { ProductModel } from "./dbModels/product.model.js";
import { UserModel } from "./dbModels/user.model.js";
import { CartModel } from "./dbModels/cart.model.js"

export const ProductManager = new MongoContainer(ProductModel);
export const UserManager = new MongoContainer(UserModel);
export const CartManager = new MongoContainer(CartModel);