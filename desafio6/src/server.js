import express  from "express";
import { Router } from "express";
import { Contenedor } from "./products.js";
import { Carrito } from "./carrito.js";
import { ContenedorProductosMongoDB } from "./managers/ContenedorMongoDB.js";
import { options } from "./config/databaseConfig.js"
import mongoose from "mongoose";
const app = express();
const PORT = 8080;
const productServices = new Contenedor("productos.txt");
const carritoServices = new Carrito("carritos.txt");
const productosMongoService = new ContenedorProductosMongoDB("ecommerce")
const routerProductos = Router();
const routerCarrito = Router();
const server = app.listen( PORT, ()=>{console.log(`Server listening on port: ${PORT}`);})

mongoose.connect("mongodb+srv://ferastrozombie:flemita666@ecommerce.amqtcgi.mongodb.net/ecommerce?retryWrites=true&w=majority",{useNewUrlParser: true});
app.use(express.urlencoded({extended: true}));
app.use(express.json());

let administrador = true;

routerProductos.get("/productos",async(req, res) =>{
    const productosObtenidos = await productosMongoService.getAll();
    if(productosObtenidos){
        res.json({
            productosObtenidos,
        });
    }else{
        res.json({
            msg: "No hay productos. Por favor cree uno"
        })
    }
});

routerProductos.get("/productos/:id",async(req, res) =>{
    const  id = (req.params.id)
    const producto = await productosMongoService.getById(id);
    console.log(id);    
        res.json({
            producto
        })
});

if(administrador){

    routerProductos.post("/productos", async(req, res) => {        
        let newProduct = req.body;
        await productosMongoService.save(newProduct)
        res.json({
            msg: "Se agrego el producto"
        })
    });

    routerProductos.put("/productos/:id",async(req, res) =>{
        let  id = (req.params.id);
        let {nombre, descripcion, url, precio, stock} = req.body;
        await productosMongoService.updateById(id, nombre, descripcion, url, precio, stock)
        res.json({
            msg: `Se modifico el producto con el id: ${id}`
        })
        
    });
    
    routerProductos.delete("/productos/:id",async(req, res) =>{
        const  id = (req.params.id)
        const productos = await productosMongoService.getAll();
        if(id > productos.length){
            res.json({
                msg: "No se puede elimar el producto.",
            })
        }else{
            await productosMongoService.deleteById(id);
            res.json({
                msg: `Se elimino el producto con el id ${id}`,
            })
        }
    });

}

routerCarrito.post("/", async(req, res) => {   
    const carrito = {
        productos: []
    }
    await carritoServices.save(carrito)
    res.json({
        msg: "Se creo el carrito"
    })
});

routerCarrito.delete("/carritos/:id",async(req, res) =>{
    const  id = parseInt((req.params.id))
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
    }
});

routerCarrito.get("/:id/productos",async(req, res) =>{
    const  id = (req.params.id)
    const carritos = await carritoServices.getAll();
    const carrito = await carritoServices.getById(parseInt(id));
    let productos = carrito.productos;
    console.log(productos);
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

routerCarrito.post("/:id/productos", async(req, res) => {   
    const  idCarrito = parseInt((req.params.id));
    let carritos = await carritoServices.getAll();
    let carrito = await carritoServices.getById(idCarrito);
    let idProducto = parseInt(req.body.id);
    let producto = await productServices.getById(idProducto);
    let productosTotales = await productServices.getAll();
    let today = new Date();
    let now = today.toLocaleString();
    let timestamp = now
    if(isNaN(idProducto)){
        res.json({
            error: "El parametro no es un numero"
        });
    }else if(idProducto > productosTotales.length ){
        res.json({
            erorr: `El producto con el id:${idProducto} no existe`
        })
    }else if(idCarrito > carritos.length){
        res.json({
            error: `El carrito con el id:${idCarrito} no existe`
        })
    }else{
        await carrito.productos.push(producto)
        let productos = carrito.productos
        await carritoServices.updateById(idCarrito, timestamp, productos)
        res.json({
            msg: "Se agrego el producto al carrito"
        })
    }
});

routerCarrito.delete("/:id/carritos/:id_prod",async(req, res) =>{
    const idCarrito = parseInt((req.params.id))
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
    }
});


app.use('/api', routerProductos);
app.use('/api', routerCarrito);
