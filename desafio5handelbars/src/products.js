const fs = require("fs");
const { title } = require("process");

class Contenedor {
    constructor(name) {
        this.filename = name;
    }

    // funcion para agregar productos
    async save (product){
        try {
            if(fs.existsSync(this.filename)){
                const productos = await this.getAll();
                if(productos.length > 0){
                    // agregar producto
                    const lastId = productos[productos.length -1].id +1;
                    product.id = lastId;
                    productos.push(product);
                    await fs.promises.writeFile(this.filename,JSON.stringify(productos,null,2));
                }else {
                    // si no hay productos, este sera el primero
                    product.id = 1;
                    await fs.promises.writeFile(this.filename,JSON.stringify([product],null,2));
                }
            }else{
                product.id = 1;
                    await fs.promises.writeFile(this.filename,JSON.stringify([product],null,2));
            }
        } catch (error) {
            return "El producto no pudo ser guardado";
        }
    }

    // funcion para obtener todos los productos
    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.filename, "utf-8");
            if(contenido.length > 0){
                const productos = JSON.parse(contenido);
                return productos;
            }else {
                return [];
            }            
        } catch (error) {
            return "No se pudo leer el archivo";
        }
    }

    // funcion para buscar productos por ID
    async getById(id){
        try {
            //Obtengo los productos
            const productos = await this.getAll();
            //Busco el producto por el id
            const producto = productos.find(elemento => elemento.id === id);            
            if(producto){
                return producto;
            }else {
                return "El producto no existe"
            }
        } catch (error) {
            return "Producto no encontrado"
        }
    }

    // funcion para eliminar por ID
    deleteById = async(id)=>{
        try {
            const productos = await this.getAll();
            const newProducts = productos.filter(item=>item.id!==id);
            await fs.promises.writeFile(this.filename, JSON.stringify(newProducts, null, 2));
            return `product with id:${id} deleted`;
        } catch (error) {
            console.log(error)
        }
    }
    
    updateById = async(id,title, price, url)=>{
        try {
            const productos = await this.getAll();
            const productPos = productos.findIndex(elm=>elm.id === id);
            productos[productPos] = {
                id:id,
                title: title,
                price: price,
                url, url
            };
            await fs.promises.writeFile(this.filename, JSON.stringify(productos, null, 2))
            return productos;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor