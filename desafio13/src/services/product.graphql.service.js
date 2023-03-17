import { getApiDao } from "../model/index.js";
import { options } from "../config/config.js";

const { ProductManager } = await getApiDao(options.server.DV_TYPE);

export const rootProducts = {
    getProducts:async()=>{
        return await ProductManager.getAll();
    },

    getProductById: async ({id})=>{
        return await ProductManager.getById(id);
    },

    addProduct: async ({product})=>{
        return await ProductManager.save(product);
    }
};