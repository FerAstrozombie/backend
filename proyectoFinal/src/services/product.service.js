import { ProductManager } from "../models/index.js"

class ProductService{
    static async getProducts(){
        return await ProductManager.getAll();
    };

    static async saveProduct(body){
        return await ProductManager.save(body);
    }

    static async getById(id){
        return await ProductManager.getById(id);
    }
};

export { ProductService }