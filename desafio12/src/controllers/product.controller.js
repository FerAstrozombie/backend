import { ProductSevice } from "../services/product.service.js";

class ProductController{
    static async getProducts (req, res){
        try {
            const response = await ProductSevice.getProducts();
            res.status(200).json({"productos" : response})
            /* const user = req.user.nombre; */
            /* res.render("productos",{
                productos: response,
                user: user
            }) */
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
            res.status(200).json({"productos" : response})       
            /* res.redirect("/productos"); */
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
            res.status(200).json({"producto" : response})   
            /* res.render("detalle", {
                producto: response
            }) */
        } catch (error) {
            res.status(400).json({
                status: "ERROR",
                message:`Hubo un error ${error}`
            })
        }
    };

    static async deleteById (req, res) {
        const response = await ProductSevice.deleteById(req.params.id)
        res.status(200).json({"message" : response})
    }

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