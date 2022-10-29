const express = require("express");

const Contenedor = require("./contenedor");

const app = express();

const PORT = 8080;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

const contenedorProductos = new Contenedor("productos.txt")

app.get("/",(req, res) =>{
    
    res.send("<h1 style='color: black','text-align: center'>Bienvenido a nuestro servidor</h1>");
    
});

app.get("/productos",async (req, res) =>{
    const productoEncontrado = await contenedorProductos.getAll();
    res.send(productoEncontrado);
});

app.get("/productosRandom",async (req, res) =>{   
    const productos = await contenedorProductos.getAll(); 
    productoRandom = parseInt(Math.random() * productos.length + 1);
    const productofiltrado = await contenedorProductos.getById(productoRandom);
    res.send(productofiltrado);
});



