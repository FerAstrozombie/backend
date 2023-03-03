import { ProductService } from "../services/product.service.js"

class ProductController{

    static async getProducts (req, res){
        try {
            const productos = await ProductService.getProducts();
            res.render("productos",{
                productos: productos,
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
            const response = await ProductService.saveProduct(req.body);
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
            const response = await ProductService.getById(req.params.id);
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
}

export { ProductController }