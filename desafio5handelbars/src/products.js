const productos = [];

class Producto {
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
const producto2 = new Producto ("Remera", 600, "https://http2.mlstatic.com/D_NQ_NP_793009-MLA47515448181_092021-O.jpg", 2)

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


module.exports = { Producto, productos };