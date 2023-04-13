import { ProductModel } from "../model/dbmodels/product.model.js";
import { ProductSevice } from "../services/product.service.js";

class CategoryController{

    static async getProduct (req, res){
        const categoria = req.params.categoria
        const user = req.user.nombre;
        const product = await ProductModel.find({categoria : {$eq:categoria}}).lean()
        if(categoria === "todo"){
            const response = await ProductSevice.getProducts();
            res.render("productos",{
                productos: response,
                user: user
            })
        }else if(categoria === "medias" || "pantalones" || "remeras" || "gorras"){
            res.render("productos",{
                productos: product,
                user: user
            })
        }
    }
}

export { CategoryController }