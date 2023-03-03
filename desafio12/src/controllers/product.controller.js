import { ProductSevice } from "../services/product.service.js";

class ProductController{
    static async getProducts (req, res){
        try {
            const response = await ProductSevice.getProducts();
            res.status(200).json({
                status: "SUCESS",
                productos: response
            })
        } catch (error) {
            res.status(400).json({
                status: "ERROR",
                message:`Hubo un error ${error}`
            })
        }
    };

    static async saveProduct (req, res){
        try {
            const response = await ProductSevice.saveProduct(req.body);
            res.status(200).json({
                status: "SUCESS",
                productos: response
            })
        } catch (error) {
            res.status(400).json({
                status: "ERROR",
                message:`Hubo un error ${error}`
            })
        }
    }

    static async getById (req, res){
        try {
            const response = await ProductSevice.getById(req.params.id);
            res.status(200).json({
                status: "SUCESS",
                productos: response
            })
        } catch (error) {
            res.status(400).json({
                status: "ERROR",
                message:`Hubo un error ${error}`
            })
        }
    }
}

export { ProductController }