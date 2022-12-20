import express  from "express";
import { Router } from "express";
import { Contenedor } from "./products.js";
import { Carrito } from "./carrito.js";
import { ContenedorProductosMongoDB } from "./managers/ContenedorProductosMongoDB.js";
import { options } from "./config/databaseConfig.js"
import { ContenedorCarritosMongoDb } from "./managers/ContenedosCarritosMongoDB.js";
import { ContenedorProductosFirebase } from "./managers/ContenedorProductosFirebase.js";
import { ContenedorCarritosFirebase } from "./managers/ContenedorCarritosFirebase.js";
import { ContenedorDaoProductos } from "./daos/index.js";
import { ContenedorDaoCarritos } from "./daos/index.js";
const app = express();
const PORT = 8080;
/* const productServices = new Contenedor("productos.txt");
const carritoServices = new Carrito("carritos.txt");
const productosMongoService = new ContenedorProductosMongoDB(options.mongoDB,"ecommerce" )
const carritoMongoServices = new ContenedorCarritosMongoDb(options.mongoDB,"ecommerce")
const productosFirebaseServices = new ContenedorProductosFirebase(options.firebase,"ecommercebackend-44699")
const carritosFirebaseServices = new ContenedorCarritosFirebase(options.firebase,"ecommercebackend-44699") */
const productosApi = ContenedorDaoProductos;
const carritosApi = ContenedorDaoCarritos;
const routerProductos = Router();
const routerCarrito = Router();
const server = app.listen( PORT, ()=>{console.log(`Server listening on port: ${PORT}`);})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let administrador = true;

routerProductos.get("/productos",async(req, res) =>{
    const productosObtenidos = await productosApi.getAll();
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
    const producto = await productosApi.getById(id);
    if(producto){
        res.json({
            producto
        })
    }else{
        res.json({
            msg: `No existe un producto con el id: ${id}` 
        })
    }    
});

if(administrador){

    routerProductos.post("/productos", async(req, res) => {        
        let newProduct = req.body;
        await productosApi.save(newProduct)
        res.json({
            msg: "Se agrego el producto"
        })
    });

    routerProductos.put("/productos/:id",async(req, res) =>{
        let  id = (req.params.id);
        let {nombre, descripcion, url, precio, stock} = req.body;
        await productosApi.updateById(id, nombre, descripcion, url, precio, stock)
        res.json({
            msg: `Se modifico el producto con el id: ${id}`
        })
        
    });
    
    routerProductos.delete("/productos/:id",async(req, res) =>{
        const  id = (req.params.id)
        const productosObtenidos = await productosApi.getAll();
        const producto = await productosApi.getById(id);
        if(productosObtenidos.length > 0){
            if(producto){
                await productosApi.deleteById(id);
                res.json({
                    msg: `Se elimino el producto con el id ${id}`,
                })}else {
                    res.json({
                        msg: `No se encontro el producto con el id: ${id}`,
                    })
                }            
        }else{
            res.json({
                msg: `No se encontro el producto con el id: ${id}`,
            })
        }      

    });

}

routerCarrito.post("/", async(req, res) => {   
    const carrito = {
        productos: []
    }
    await carritosApi.save(carrito)
    res.json({
        msg: "Se creo el carrito"
    })
});

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
routerCarrito.get("/:id", async(req,res)=>{
    let id = req.params.id
    let carrito = await carritosApi.getById(id)
    res.json({
        carrito
    });
})
routerCarrito.post("/:id/productos", async(req, res) => {   
    /* const  idCarrito = parseInt((req.params.id));
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
    } */
    const  idCarrito = (req.params.id);
    let carrito = await carritosApi.getById(idCarrito);
    let idProducto = req.body.id;
    let producto = await productosApi.getById(idProducto);
    let productoAgregar = producto[0]
    let today = new Date();
    let now = today.toLocaleString();
    let timestamp = now
    carrito[0].productos.push(productoAgregar)
    let productos = carrito[0].productos
    await carritosApi.updateById(idCarrito, timestamp, productos)
        res.json({
            msg: "Se agrego el producto al carrito"
        })
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


app.use('/api', routerProductos);
app.use('/api', routerCarrito);
