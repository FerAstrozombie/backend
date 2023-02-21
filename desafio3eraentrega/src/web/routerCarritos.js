import express  from "express";
const routerCarrito = express.Router();
import { ContenedorDaoCarritos } from "../daos/index.js";
import { ContenedorDaoProductos } from "../daos/index.js";
import { logger } from "../loggers/logger.js";
import { UserModel } from "../models/users.js";
import { transporter } from "../messages/email.js";
import { twilioClient, twilioPhone, adminPhone } from "../messages/whatsaap.js"
const carritosApi = ContenedorDaoCarritos;
const productosApi = ContenedorDaoProductos
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

routerCarrito.get("/carrito", async (req, res) => {
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
})
routerCarrito.post("/compra", async (req, res) => {
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
        to: "fernandopunk77@gmail.com",
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
})
routerCarrito.delete("/carritos/:id",async(req, res) =>{
    /* const  id = parseInt((req.params.id))
    const carritos = await carritoServices.getAll();
    if(id > carritos.length){
        res.json({
            msg: "No se puede eliminar el carrito.",
        })
    }else{
        await carritoServices.deleteById(id);
        res.json({
            msg: `Se elimino el carrito con el id ${id}`,
        })
    } */
    const id = req.params.id
    await carritosApi.deleteById(id);
    res.json({
        msg: `Se elimino el carrito con el id ${id}`,
    })

});

routerCarrito.get("/carritos", async(req, res) =>{
    const carritos = await carritosApi.getAll();
    if(carritos.length === 0){
        res.json({
            msg: "No hay carritos, Por favor cree uno"
        })
    }else {
        res.json({
            carritos
        })
    }
})

routerCarrito.get("/:id/productos",async(req, res) =>{
    const  id = (req.params.id)
    const carritos = await carritosApi.getAll();
    const carrito = await carritosApi.getById(parseInt(id));
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
});

routerCarrito.get("/carrito/:id", async (req, res) => {
    let id = req.params.id
    let carrito = await carritosApi.getById(id)
    let producto = carrito[0].productos
    res.render("carrito",{
        productos: producto,
    })
})

routerCarrito.get("/:id", async(req,res)=>{
    let id = req.params.id
    let carrito = await carritosApi.getById(id)
    res.json({carrito})
})
routerCarrito.post("/:id/productos", async(req, res) => {   
    const  idProducto = (req.params.id);
    let id = req.session.passport.user;
    let producto = await productosApi.getById(idProducto);
    let productoFinal = producto[0]     
    const user = await UserModel.findById(id);
    let carrito = user.carrito[0].productos;
    carrito.push(productoFinal);
    await UserModel.updateOne(user)
    res.send("/")
});

routerCarrito.delete("/:id/carritos/:id_prod",async(req, res) =>{
    /* const idCarrito = parseInt((req.params.id))
    const idProducto = parseInt((req.params.id_prod))
    const carrito = await carritoServices.getById(idCarrito);
    let today = new Date();
    let now = today.toLocaleString();
    let timestamp = now    
    let productos = carrito.productos

    if(productos === undefined){
        res.json({
            msg: "No se encontro el carrito.",
        })
    }else{
        const index = productos.findIndex(elem => elem.id === idProducto);
        
        if(index === -1){
            res.json({
                erorr: "Producto no encontrado en el carrito"
            })
        }else{
            let eliminado = productos.splice(index,1);        
            carritoServices.updateById(idCarrito,timestamp, productos)
            res.json({
                msg: `Se elimino del carrito con el id:${idCarrito} el producto con el id:${idProducto}`,
            })
        }
    } */
    const idCarrito = (req.params.id);
    const idProducto = (req.params.id_prod);
    const carrito = await carritosApi.getById(idCarrito);
    let productos = carrito[0].productos
    let today = new Date();
    let now = today.toLocaleString();
    let timestamp = now;
    if(productos === undefined){
        res.json({
            msg: "No se encontro el carrito.",
        })
    }else{
        const index = productos.findIndex(elem => elem._id == idProducto);
        
        if(index === -1){
            res.json({
                erorr: "Producto no encontrado en el carrito"
            })
        }else{
            let eliminado = productos.splice(index,1);        
            carritosApi.updateById(idCarrito,timestamp, productos)
            res.json({
                msg: `Se elimino del carrito con el id:${idCarrito} el producto con el id:${idProducto}`,
            })
        }
    }
    
});

export default routerCarrito;