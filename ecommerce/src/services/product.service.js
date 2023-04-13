import { getApiDao } from "../model/index.js";
import { options } from "../config/config.js";
import { convertProductToDto } from "../model/dtos/product.dto.js"

const { ProductManager } = await getApiDao(options.server.DV_TYPE);

class ProductSevice{
    static async getProducts(){
        const products = await ProductManager.getAll();
        const productsDto = convertProductToDto(products);
        return productsDto;
    }

    static async saveProduct(body){
        return await ProductManager.save(body);
    }

    static async getById(id){
        const product = await ProductManager.getById(id);
        const productDto = convertProductToDto(product);
        return productDto
    }

    static async deleteById(id){
        return await ProductManager.deleteById(id);
    }

    static async updateProduct(body, id){
        return await ProductManager.updateById(body, id);
        
    }
}

export { ProductSevice }