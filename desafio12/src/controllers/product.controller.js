import { ProductSevice } from "../services/product.service.js";

class ProductController{
    static async getProducts (req, res){
        try {
            const response = await ProductSevice.getProducts();
            const user = req.user.nombre;
            res.render("productos",{
                productos: response,
                user: user
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
await ProductSevice.saveProduct(req.body);       
            res.redirect("/productos");
        } catch (error) {
            res.status(400).json({
                status: "ERROR",
                message:`Hubo un error ${error}`
            })
        }
    };

    static async getById (req, res){
        try {
            const response = await ProductSevice.getById(req.params.id);
            res.render("detalle", {
                producto: response
            })
        } catch (error) {
            res.status(400).json({
                status: "ERROR",
                message:`Hubo un error ${error}`
            })
        }
    };

    static async getLista (req, res){
        try {
            const response = await ProductSevice.getProducts();
            res.render("listadeproductos",{
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