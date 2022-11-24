const express = require("express");
const { Router } = require("express");
const  Contenedor = require("./products");
const app = express();
const PORT = 8080;
const { Server } = require("socket.io");
const path = require('path')
const productServices = new Contenedor("productos.txt");
const routerProductos = Router();
const server = app.listen( PORT, ()=>{console.log(`Server listening on port: ${PORT}`);})
const io = new Server(server);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.set("views",__dirname + "/views");
app.set("view engine" , "ejs");

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    socket.emit("products", await productServices.getAll());
    socket.on("newProduct", async(data) => {
        await productServices.save(data);
        
        socket.emit("products", await productServices.getAll());
    })
});

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
})

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
})

routerProductos.post("/productos", async(req, res) => {
    let newProduct = req.body;
    await productServices.save(newProduct)
    res.redirect("/productos")
})

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
})

routerProductos.put("/productos/:id",async(req, res) =>{
    let  id = parseInt((req.params.id));
    let {title, price, url} = req.body;
    await productServices.updateById(id, title, price, url)
    res.json({
        msg: `Se modifico el producto con el id: ${id}`
    })
    
})

app.get("/productos", async(req, res) => {
    const productos = await productServices.getAll()
    res.render("index.ejs",{
        productos : productos
    })
})

app.get("/listadeproductos", async(req, res) => {
    const productos = await productServices.getAll()
    res.render("listaProductos.ejs",{
        productos: productos
    })
})
app.use('/api', routerProductos);