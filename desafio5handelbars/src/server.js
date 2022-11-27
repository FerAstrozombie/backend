const express = require("express");
const { Router } = require("express");
const  Contenedor = require("./products");
const Chat = require("./chat");
const options = require("./config/databaseConfig");
const ContenedorSql = require("./contenedorSql");
const app = express();
const PORT = 8080;
const { Server } = require("socket.io");
const path = require('path')
const productServices = new Contenedor("productos.txt");
const chatServices = new Chat("chats.txt")
const productosApi = new ContenedorSql(options.mariaDB, "productos");
const chatApi = new ContenedorSql(options.sqliteDB, "chat");
const routerProductos = Router();
const server = app.listen( PORT, ()=>{console.log(`Server listening on port: ${PORT}`);})
const io = new Server(server);
const handlebars = require("express-handlebars");
const viewsFolder = path.join(__dirname,"views")
console.log(viewsFolder);

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars",handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine","handlebars");

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    socket.emit("products", await productosApi.getAll());
    socket.emit("mensajesChat", await chatApi.getAll());
    socket.on("newProduct", async(data) => {
        await productosApi.save(data);        
        io.sockets.emit("products", await productosApi.getAll());
    })
    socket.on("nuevoMensaje", async (data) => {        
        await chatApi.save(data);
        io.sockets.emit("mensajesChat", await chatApi.getAll());

    })
});

routerProductos.get("/productos",async(req, res) =>{
    const productosObtenidos = await productosApi.getAll();
    if(productosObtenidos){
        res.json({
            productosObtenidos,
        });
    }else{
        res.json({
            error: "No hay productos."
        })
    }
})

routerProductos.get("/productos/:id",async(req, res) =>{
    const  id = (req.params.id)
    const producto = await productosApi.getById(parseInt(id));
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
    await productosApi.save(newProduct)
    res.redirect("/productos")
})

routerProductos.delete("/productos/:id",async(req, res) =>{
    const  id = parseInt((req.params.id))
    const producto = await productosApi.getById(id)
    
    if(producto.id == id){
        await productosApi.deleteById(id);
            res.json({
                msg: `Se elimino el producto con el id ${id}`,
            })
    }else{
        res.json({
            msg: "No se puede elimar el producto.",
        })
    }
})

routerProductos.put("/productos/:id",async(req, res) =>{
    let  id = parseInt((req.params.id));
    const producto = await productosApi.getById(id)
    let {title, price, url} = req.body;
    if(producto.id == id){
        await productosApi.updateById(id, title, price, url)
            res.json({
                msg: `Se modifico el producto con el id: ${id}`
            })
    }else{
        res.json({
            msg: "No se puede modificar el producto.",
        })
    }

    
})


app.get("/productos", async(req, res) => {
    const productos = await productosApi.getAll()
    res.render("productos",{
        productos : productos,
    })
})

app.get("/listadeproductos", async(req, res) => {
    const productos = await productosApi.getAll()
    res.render("listadeproductos",{
        productos: productos,
        compare: productos.length > 0
    })
})

app.use('/api', routerProductos);