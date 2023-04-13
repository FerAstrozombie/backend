import { logger } from "../logger/logger.js";
import { UserModel } from "../models/dbModels/user.model.js";
import { ProductService } from "../services/product.service.js";
import { transporter } from "../messages/email.js";
import { twilioClient, twilioPhone, adminPhone } from "../messages/whatsaap.js";
import { options } from "../config/config.js";

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
        let id = req.session.passport.user        
        const user = await UserModel.findById(id);
        let productos = JSON.stringify(user.carrito[0]);
        const emailTemplate = `<div>
                                    <h1>Nuevo pediro realizado</h1>
                                    <h3>Carrito generado</h3>
                                    ${productos}
                                </div>`
        transporter.sendMail({
            from: "Server app Node",
            to: options.nodemailer.user,
            subject: `Nuevo pedido de: ${user.nombre} email: ${user.email}`,
            html: emailTemplate           
        });
        try {
            await twilioClient.messages.create({
            from: twilioPhone,
            to: adminPhone,
            body: `Nuevo pedido de: ${user.nombre} email: ${user.email}`,
        })
        } catch (error) {
            logger.error(error);
        }
        res.render("compra")
    }
}

export { cartController }