import { logger } from "../logger/logger.js";
import { UserModel } from "../models/dbModels/user.model.js";
import { ProductService } from "../services/product.service.js";

class cartController{
    static async getCarrito (req, res) {
        let id = req.session.passport.user        
        const user = await UserModel.findById(id);
        let carrito = user.carrito[0]
        let productos = carrito.productos;
        let idCarrito = carrito._id
        res.render("carrito",{
            productos: productos,
            id: idCarrito,
            carrito: carrito
        })
    };

    static async addProduct (req, res) {   
        let id = req.session.passport.user;
        let producto = await ProductService.getById(req.params.id);
        let productoFinal = producto.message 
        const user = await UserModel.findById(id);
        let carritoDb = user.carrito
        let carrito = user.carrito[0].productos;
        carrito.push(productoFinal);
        await UserModel.updateOne({_id : {$eq:id}}, {carrito: carritoDb});
        res.redirect("/carrito")
    };

    static async getBuy (req, res) {
        res.render("compra")
    }
}

export { cartController }