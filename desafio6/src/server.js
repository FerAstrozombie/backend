const express = require("express");
const { Router } = require("express");
const  Contenedor = require("./products");
const Carrito = require("./carrito");
const app = express();
const PORT = 8080;
const productServices = new Contenedor("productos.txt");
const carritoServices = new Carrito("carritos.txt");
const routerProductos = Router();
const routerCarrito = Router();
const server = app.listen( PORT, ()=>{console.log(`Server listening on port: ${PORT}`);})

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let administrador = true;

routerProductos.get("/productos",async(req, res) =>{
    const productosObtenidos = await productServices.getAll();
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
    const producto = await productServices.getById(parseInt(id));
    if(isNaN(id)){
        res.json({
            error: "El parametro no es un numero"
        });
    }else{
        res.json({
            producto
        })
    }
});

if(administrador){

    routerProductos.post("/productos", async(req, res) => {        
        let newProduct = req.body;
        await productServices.save(newProduct)
        res.json({
            msg: "Se agrego el producto"
        })
    });

    routerProductos.put("/productos/:id",async(req, res) =>{
        let today = new Date();
        let now = today.toLocaleString();
        let  id = parseInt((req.params.id));
        let timestamp = now
        let {nombre, descripcion, codigo, url, precio, stock} = req.body;
        await productServices.updateById(id, nombre, descripcion, codigo, url, precio, stock, timestamp)
        res.json({
            msg: `Se modifico el producto con el id: ${id}`
        })
        
    });
    
    routerProductos.delete("/productos/:id",async(req, res) =>{
        const  id = parseInt((req.params.id))
        const productos = await productServices.getAll();
        if(id > productos.length){
            res.json({
                msg: "No se puede elimar el producto.",
            })
        }else{
            await productServices.deleteById(id);
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
    const carrito = await carritoServices.getById(parseInt(id));
    let productosDelCarrito = carrito.productos;
    if(productosDelCarrito === undefined){
        res.json({
            error: "No hay productos en el carrito"
        });
    }else{
        res.json({
            productosDelCarrito
        })
    }
});

routerCarrito.post("/:id/productos", async(req, res) => {   
    const  idCarrito = parseInt((req.params.id));
    let carrito = await carritoServices.getById(idCarrito)
    let idProducto = parseInt(req.body.id);
    let producto = await productServices.getById(idProducto);
    let today = new Date();
    let now = today.toLocaleString();
    let timestamp = now
    await carrito.productos.push(producto)
    let productos = carrito.productos
    await carritoServices.updateById(idCarrito, timestamp, productos)
    res.json({
        msg: "Se agrego el producto al carrito"
    })
});

routerCarrito.delete("/:id/carritos/:id_prod",async(req, res) =>{
    const idCarrito = parseInt((req.params.id))
    const idProducto = parseInt((req.params.id_prod))
    const carrito = await carritoServices.getById(idCarrito);
    let today = new Date();
    let now = today.toLocaleString();
    let timestamp = now    
    let productos = carrito.productos
    if(idCarrito > carrito.length){
        res.json({
            msg: "No se encontro el carrito.",
        })
    }else{
        /* let eliminado = carrito.productos.filter(elem => elem.id ===idProducto);
        console.log(eliminado); */
        const index = productos.findIndex(elem => elem.id === idProducto);
        let eliminado = productos.splice(index,1);        
        carritoServices.updateById(idCarrito,timestamp, productos)
        res.json({
            msg: `Se elimino del carrito con el id:${idCarrito} el producto con el id:${idProducto}`,
        })
    }
});


app.use('/api', routerProductos);
app.use('/api', routerCarrito);
