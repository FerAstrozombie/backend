import { CartSevice } from "../services/cart.service.js";
import { ProductSevice } from "../services/product.service.js";
import { UserModel } from "../model/dbmodels/user.model.js";
import { logger } from "../loggers/logger.js";
import { transporter } from "../messages/email.js";
import { twilioClient, twilioPhone, adminPhone } from "../messages/whatsaap.js";
import { options } from "../config/config.js";
import { OrdenModel } from "../model/dbmodels/orden.model.js";
import { UserService } from "../services/user.service.js"; 
import { CartModel } from "../model/dbmodels/carrito.model.js";
import { OrdenService } from "../services/orden.service.js"

class CartController{
    static async getCarts (req, res){
        const carritos = await CartSevice.getCarts();
        if(carritos.length === 0){
            res.json({
                msg: "No hay carritos, Por favor cree uno"
            })
        }else {
            res.json({
                carritos
            })
        }
    };

    static async deleteCart (req, res){
        const id = req.params.id
        await CartSevice.deleteById(id);
        res.json({
            msg: `Se elimino el carrito con el id ${id}`,
        })
    };

    static async getCartById (req, res){
        let id = req.session.passport.user        
        const user = await UserModel.findById(id);
        let carrito = user.carrito[0]
        let productos = carrito.productos;
        let idCarrito = carrito._id
        res.render("carrito",{
            productos,
            idCarrito,
            carrito
        })
    };

    static async productsOnCart (req, res){
        const  id = req.params.id
        const carritos = await CartSevice.getCarts();
        const carrito = await CartSevice.getById(parseInt(id));
        let productos = carrito.productos;
        logger.info(productos);
        if(id > carritos.length){
            res.json({
                error: "No hay carrito con ese Id"
            });
        }
        if(productos === undefined){
            res.json({
                error: "No hay productos en el carrito"
            });
        }else{
            res.json({
                productos
            })
        }
    };

    static async addToCart (req, res){
        const  idProducto = req.params.id;
        let id = req.session.passport.user;
        let producto = await ProductSevice.getById(idProducto);
        const user = await UserModel.findById(id);
        let carritoDb = user.carrito;
        let idCarrito = carritoDb[0]._id
        let carrito = user.carrito[0].productos;
        const isInCart = (id) => {
            return carrito.find((product) =>product.id == idProducto);
        };
        let cantidad = 1
        const itemInCart = isInCart(idProducto);
        if (itemInCart) {
            itemInCart.cantidad = itemInCart.cantidad += cantidad;            
        }else {
            carrito.push({...producto, cantidad});
        }
        await CartModel.updateOne({_id : {$eq:idCarrito}}, {productos: carrito});
        await UserModel.updateOne({_id : {$eq:id}}, {carrito: carritoDb});
        res.redirect("/carrito")
    };

    static async getCart (req, res){
        let id = req.session.passport.user;
        const user = await UserModel.findById(id);
        let carritoDb = user.carrito[0];
        let idCarrito = carritoDb._id;
        let productos = carritoDb.productos;
        let carrito = user.carrito[0].productos;
        const totalPrecioCart = () => {
            return carrito.reduce((acc, cartItem) => acc + cartItem.precio * cartItem.cantidad, 0);
        };
        const total = totalPrecioCart();
        res.render("carrito",{
            productos,
            idCarrito,
            carrito: carritoDb,
            total
        })
    };

    static async compra (req, res){
        let id = req.session.passport.user;     
        const user = await UserModel.findById(id).lean();
        const userDto = await UserService.getUserById(id)
        let productos = user.carrito[0].productos;
        let idCarrito = user.carrito[0]._id
        const carrito = user.carrito;
        await CartModel.updateOne({_id : idCarrito}, {$set: {carrito: carrito }});
        const newCart = await CartSevice.createCart();
        await UserModel.updateOne({_id : id}, {$set: {carrito: newCart }});
        const orden = {
                nombre: userDto.nombre,
                apellido: userDto.apellido,
                email: userDto.email,
                productos: productos,
            };
        const response = await OrdenService.createOrder(orden);
        const idOrden = response._id;
        await OrdenModel.updateOne({_id : idOrden}, {$set: {orden: orden }})
        const orderUser =  await OrdenService.getOrderById(idOrden);
        const ordenRender = orderUser.productos;
        await UserModel.updateOne({_id : id}, {$push: {ordenes: orderUser}});
        const emailTemplate = `<div>
                                    <h1>Nueva orden generada por ${user.nombre}</h1>
                                    <h3>Orden generado con el id: ${idOrden}</h3>
                                    <h3>Detealle de los productos</h3>
                                    ${productos.map(function(producto){
                                        return `<h3>Nombre: ${producto.nombre}</h3>
                                                <h3>Precio: ${producto.precio}</h3>
                                                <h3>Id producto: ${producto.id}</h3>
                                                <h3>Cantidad: ${producto.cantidad}</h3>
                                                <img src=${producto.url} alt=${producto.nombre} width="200"
                                                height="200">
                                        `
                                    }).join("")}
                                </div>`
        transporter.sendMail({
            from: "Server app Node",
            to: options.nodemailer.user,
            subject: `Nueva orden de: ${user.nombre} email: ${user.email}`,
            html: emailTemplate           
        });
        try {
            await twilioClient.messages.create({
            from: twilioPhone,
            to: adminPhone,
            body: `Nueva orden de: ${user.nombre} email: ${user.email}`,
        })
        } catch (error) {
            logger.error(error);
        };
        res.render("compra",{
            user: userDto,
            productos : ordenRender
        })
    };

    static async deleteProducts(req, res){
        let id = req.session.passport.user;
        const idCarrito = req.params.id;        
        const carritoNuevo = await CartModel.find({_id : idCarrito});
        const cartNuevo = []
        await CartModel.updateOne({_id : {$eq:idCarrito}}, {$set: {productos: cartNuevo }});
        const cartAgregar = await CartModel.find({_id : idCarrito});
        await UserModel.updateOne({_id : {$eq:id}}, {carrito: cartAgregar});
        res.redirect("/carrito")
    };

    static async getOrders(req, res){
        let id = req.session.passport.user 
        const user = await UserModel.findById(id).lean();
        const ordenes = user.ordenes
        res.render("ordenes",{
            ordenes: ordenes
        })
    }

    static async deleteProductsOnCart(req, res){
        let id = req.session.passport.user;
        let idProducto = req.params.id
        const user = await UserModel.findById(id);
        let carritoDb = user.carrito[0];
        let idCarrito = carritoDb._id;
        let carrito = carritoDb.productos;
        let producto = await ProductSevice.getById(idProducto);
        const removeItem = (productId) => {
            return carrito.filter((product) => product.id !== productId);
        };
        const isInCart = (id) => {
            return carrito.find((product) =>product.id == idProducto);
        };
        let cantidad = 1
        const itemInCart = isInCart(idProducto);
        if (itemInCart) {
            itemInCart.cantidad = itemInCart.cantidad -= cantidad;
            const nombre = itemInCart.nombre;         
            if(itemInCart.cantidad === 0){
                const carritoNuevo = await CartModel.find({_id : idCarrito});
                const cart = carritoNuevo[0].productos
                const indice = cart.findIndex(el=> el.nombre === nombre);
                const carritoActualizado = cart.splice(indice, 1);
                await CartModel.updateOne({_id : {$eq:idCarrito}}, {$set: {productos: cart }});
                const cartAgregar = await CartModel.find({_id : idCarrito});
                await UserModel.updateOne({_id : {$eq:id}}, {carrito: cartAgregar});
            }else{
                const newCart = removeItem(idProducto);
                const carritoNuevo = await CartModel.find({_id : idCarrito});
                const cart = carritoNuevo[0].productos;
                const cartNuevo = []
                cartNuevo.push(...newCart);
                await CartModel.updateOne({_id : {$eq:idCarrito}}, {$set: {productos: cartNuevo }});
                const cartAgregar = await CartModel.find({_id : idCarrito});
                await UserModel.updateOne({_id : {$eq:id}}, {carrito: cartAgregar});
            }
        }
        res.redirect("/carrito")
        
    }
}

export { CartController }