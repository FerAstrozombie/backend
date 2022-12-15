import fs from "fs";

let today = new Date();
let now = today.toLocaleString();

class Carrito {
    constructor(name) {
        this.filename = name;
    }
    

    // funcion para crear el carrito
    async save (carrito){
        try {
            if(fs.existsSync(this.filename)){
                const carritos = await this.getAll();
                if(carritos.length > 0){
                    // agregar carrito
                    const lastId = carritos[carritos.length -1].id +1;
                    carrito.id = lastId;
                    carrito.timestamp = now;
                    carritos.push(carrito);
                    await fs.promises.writeFile(this.filename,JSON.stringify(carritos,null,2));
                }else {
                    // si no hay carritos, este sera el primero
                    carrito.id = 1;
                    carrito.timestamp = now;
                    await fs.promises.writeFile(this.filename,JSON.stringify([carrito],null,2));
                }
            }else{
                carrito.id = 1;
                carrito.timestamp = now;
                await fs.promises.writeFile(this.filename,JSON.stringify([carrito],null,2));
            }
        } catch (error) {
            return "El carrito no pudo ser guardado";
        }
    }

    // funcion para obtener todos los carritos
    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.filename, "utf-8");
            if(contenido.length > 0){
                const carritos = JSON.parse(contenido);
                return carritos;
            }else {
                return [];
            }            
        } catch (error) {
            return "No se pudo leer el archivo";
        }
    }

    // funcion para buscar carritos por ID
    async getById(id){
        try {
            //Obtengo los carritos
            const carritos = await this.getAll();
            //Busco el carrito por el id
            const carrito = carritos.find(elemento => elemento.id === id);            
            if(carrito){
                return carrito;
            }else {
                return "El carrito no existe"
            }
        } catch (error) {
            return "Carrito no encontrado"
        }
    }

    // funcion para eliminar carrito por ID
    deleteById = async(id)=>{
        try {
            const carritos = await this.getAll();
            const newCarritos = carritos.filter(item=>item.id!==id);
            await fs.promises.writeFile(this.filename, JSON.stringify(newCarritos, null, 2));
            return `Carrito with id:${id} deleted`;
        } catch (error) {
            console.log(error)
        }
    }

    updateById = async(id, timestamp, productos)=>{
        try {
            const carritos = await this.getAll();
            const carritoPos = carritos.findIndex(elm=>elm.id === id);
            carritos[carritoPos] = {
                id:id,
                timestamp:timestamp,
                productos:productos
            };
            await fs.promises.writeFile(this.filename, JSON.stringify(carritos, null, 2))
            return carritos;
        } catch (error) {
            console.log(error)
        }
    }

}

export  { Carrito };