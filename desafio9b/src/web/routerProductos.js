const express = require("express");
const app = express();
const routerProductos= express.Router();
const ContenedorSql = require("../contenedorSql.js");
const optionsDB = require("../config/databaseConfig.js");
const productosApi = new ContenedorSql(optionsDB.mariaDB, "productos");


routerProductos.get("/api/productos",async(req, res) =>{
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

routerProductos.get("/api/productos/:id",async(req, res) =>{
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

routerProductos.post("/api/productos", async(req, res) => {
    let newProduct = req.body;
    await productosApi.save(newProduct)
    res.redirect("/productos")
})

routerProductos.delete("/api/productos:id",async(req, res) =>{
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

routerProductos.put("/api/productos:id",async(req, res) =>{
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

module.exports = routerProductos