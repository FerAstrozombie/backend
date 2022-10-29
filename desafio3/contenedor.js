const fs = require("fs");

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
    async deleteById(id){
        try {
            const productos = await this.getAll();
            const newProducts = productos.filter(elemnto => elemnto.id !== id);
            await fs.promises.writeFile(this.filename,JSON.stringify(newProducts,null,2));
            return `El producto con el id: ${id} fue eliminado`
        } catch (error) {
            return "El elemento no puede ser eliminado"
        }
    }
    // funcion para eliminar todo
    async deleteAll(){
        const productos = await this.getAll();
        await fs.promises.writeFile(this.filename,[]);
        return "Todos los productos fueron eliminados"
    }
}

// creo los productos
const producto1 = {
    title: "Remera",
    price: 300,
    thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Farticulo.mercadolibre.com.ar%2FMLA-694606834-remera-pokemon-pikachu-angry-big-face-original-importada-_JM&psig=AOvVaw1HkbgH3IbCypJN3ByCqWZl&ust=1666293920044000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDz4OOC7foCFQAAAAAdAAAAABAP" 
}
const producto2 = {
    title: "Pantalon",
    price: 500,
    thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2F-%2Fes%2FPok%25C3%25A9mon-Pikachu-Squirtle-Jigglypuff-Tie%2Fdp%2FB08XWSTNVC&psig=AOvVaw3_H7ko_K4UkjxoD8AwQsCF&ust=1666295254952000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCLDCqNmH7foCFQAAAAAdAAAAABAD" 
}
const producto3 = {
    title: "medias",
    price: 400,
    thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/110/201/products/soquetes-pikachu11-4bb7e1060d10e3e2a316116987765766-1024-1024.jpg" 
}
const producto4 = {
    title: "calzoncillo",
    price: 350,
    thumbnail: "https://images-na.ssl-images-amazon.com/images/I/71DjbkoOGCL._AC_UL210_SR210,210_.jpg" 
}
const producto5 = {
    title: "campera",
    price: 800,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_608907-MLA51232574547_082022-W.jpg" 
}
const manejadorProductos = new Contenedor("productos.txt");
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
getData();

module.exports = Contenedor;