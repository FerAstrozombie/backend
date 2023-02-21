import express  from "express";
const routerProductos= express.Router();
import { ContenedorDaoProductos } from "../daos/index.js";
const productosApi = ContenedorDaoProductos;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

routerProductos.post("/productos", async(req, res) => {        
    let newProduct = req.body;
    await productosApi.save(newProduct);
    res.redirect("/productos")
});

routerProductos.put("/productos/:id",async(req, res) =>{
    let  id = (req.params.id);
    let {nombre, descripcion, url, precio, stock} = req.body;
    await productosApi.updateById(id, nombre, descripcion, url, precio, stock)
    res.redirect("/productos")
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

export default routerProductos;