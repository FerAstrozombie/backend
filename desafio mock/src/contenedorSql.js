const knex = require("knex");

class ContenedorMysql {
    constructor(options, tableName){
        this.database = knex(options);
        this.table = tableName;
    }
    async getAll(){
        try {
            const response = await this.database.from(this.table).select("*");
            return response;
        } catch (error) {
            return `Hubo un error ${error}`
        }
    }
    async save(object){
        try {
            const [id] = await this.database.from(this.table).insert(object);
            return `Se ha guardado correctamente con el id:${id}`;
        } catch (error) {
            return `Hubo un error ${error}`
        }
    }

    async getById(id){
        const productos = await this.database.from(this.table).select("*");
        const producto = productos.find(elemento => elemento.id === id);            
            if(producto){
                return producto;
            }else {
                return "El producto no existe"
            }
    }

    async deleteById(id){
        try {
            const productos = await this.database.from(this.table).select("*");
            const newProducts = productos.filter(item=>item.id!==id);
            await this.database.from(this.table).where("id",id).del();
            return `product with id:${id} deleted`;
        } catch (error) {
            console.log(error)
        }
    }
    
    async updateById(id,title, price, url){
        try {
            const productos = await this.database.from(this.table).select("*");
            await this.database.from(this.table).where("id",id).update({
                id:id,
                title: title,
                price: price,
                url: url
            })
            return productos;
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = ContenedorMysql;