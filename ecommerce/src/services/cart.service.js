import { getApiDao } from "../model/index.js";
import { options } from "../config/config.js";

const { CartManager } = await getApiDao(options.server.DV_TYPE);

class CartSevice{
    static async getCarts(){
        const carts = await CartManager.getAll();
        return carts;
    }

    static async saveCart(body){
        return await CartManager.save(body);
    }

    static async getById(id){
        const cart = await CartManager.getById(id);
        return cart;
    }

    static async deleteById(id){
        return await CartManager.deleteById(id);
    }

    static async createCart(){
        return await CartManager.save();
    }
}

export { CartSevice }