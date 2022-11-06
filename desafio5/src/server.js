const express = require("express");

const { Router } = require("express");

const {Producto} = require("./products");

const app = express();

const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(__dirname + "/public"));


app.set("views",__dirname + "/views");
app.set("view engine" , "ejs");

app.listen( PORT, ()=>{
    console.log(`Server listening on port: ${PORT}`);
})


const contenedorProductos = new Producto;
const {productos} = require("./products.js")

const routerProductos = Router();


routerProductos.get("/productos",(req, res) =>{
    const productosObtenidos = contenedorProductos.getAll();
    if(productosObtenidos){
        res.json({
            productos,
        });
    }else{
        res.json({
            msg: "No hay productos. Por favor cree uno"
        })
    }
})

routerProductos.get("/productos/:id",(req, res) =>{
    const  id = (req.params.id)
    const producto = contenedorProductos.getById(parseInt(id));
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

routerProductos.post("/productos", (req, res) => {
    let producto = req.body;
    productos.push(producto);
    productos.forEach((item, Id) =>{
        item.id = Id + 1;
    });
    res.redirect("/productos")
})

routerProductos.delete("/productos/:id",(req, res) =>{
    const  id = (req.params.id)
    if(id > productos.length){
        res.json({
            msg: "No se puede elimar el producto.",
        })
    }else{
        contenedorProductos.deleteById(id);
        res.json({
            msg: `Se elimino el producto con el id ${id}`,
        })
    }
})

routerProductos.put("/productos/:id",(req, res) =>{
    let  id = parseInt((req.params.id));
    let {title, price, thumbnail,} = req.body;
    if(id <= productos.length){
        if(title && price && thumbnail){
            let index = productos.findIndex(producto => producto.id === id )
            contenedorProductos.deleteById(id);
            let producto = ({title, price, thumbnail, id})
            productos.splice(index, 0, producto)
            res.json({
                msg: "Se actualizo el producto"
            })
        }else{
            res.json({
                msg: "Por favor ingresa todos los campos: 'title, price, thumbnail'"
            })
        }
    }else{
        res.json({
            msg: "El id no es correcto"
        })
    }
})

app.get("/productos", (req, res) => {
    res.render("index.ejs",{
        products : productos
    })
})

app.get("/listadeproductos", (req, res) => {
    res.render("listaProductos.ejs",{
        products: productos
    })
})
app.use('/api', routerProductos);