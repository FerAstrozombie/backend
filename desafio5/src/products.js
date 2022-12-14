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

/* const manejadorProductos = new Contenedor("productos.txt");
console.log(manejadorProductos);
const getData = async () => {
    // guardo dos producto
    //await manejadorProductos.save(producto1);
    //await manejadorProductos.save(producto2);
    //await manejadorProductos.save(producto3)
    //await manejadorProductos.save(producto4)
    //await manejadorProductos.save(producto5)
    // obtengo los productos
    //const productos = await manejadorProductos.getAll();
    //console.log("productos",productos);
    // busco los productos por ID
    //const productoEncontrado = await manejadorProductos.getById(1);
    //console.log("Producto encontrado",productoEncontrado);
    // borro productos por el ]ID
    //await manejadorProductos.deleteById(1);
    // borro todos los productos
    //await manejadorProductos.deleteAll();
}
getData(); */

/* class Producto {
    constructor (title, price, thumbnail, id){
        this.tittle = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id= id
    }

    saveProducts (product) {
        productos.push(product)
    }
    deleteById (id){
        let index = productos.findIndex(x => x.id == id);
        console.log(index);  
        if(index > -1){
            productos.splice(index, 1)
            return `El producto con el id: ${id} fue eliminado`
        }else{
            return "El producto no puede ser eliminado"
        }      
    }
    getAll () {
        productos.map((productos) => productos)
        return productos;
    }
    getById(id){
        this.getAll();
        const producto = productos.find(elemento => elemento.id === id);
        if(producto){
            return producto
        }else {
            return "El producto no existe"
        }
    }
    
}

const producto1 = new Producto ("Pantalon", 500, "https://m.media-amazon.com/images/I/81swMFz35FS._AC_UY1000_.jpg", 1)
const producto2 = new Producto ("Remera", 600, "https://http2.mlstatic.com/D_NQ_NP_793009-MLA47515448181_092021-O.jpg", 2) */

//manejadorProductos = new Producto;
//manejadorProductos.saveProducts(producto1);
//manejadorProductos.saveProducts(producto2);
//const todos = manejadorProductos.getAll();
//console.log(todos);
//console.log(productos);
//const productoEncontrado = manejadorProductos.getById(1);
//console.log("producto encontrado:", productoEncontrado);
//const productoEliminado = manejadorProductos.deleteById(7);
//console.log("producto eliminado",productoEliminado);


module.exports = Contenedor