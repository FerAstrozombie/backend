class ContenedorCarritosMongoDb  {
    constructor(model){
        this.model = model
    }

    async getAll(){
        let carritos = await this.model.find().lean();
        return carritos;
    }

    async save(carrito){
        let agregarCarrito = await this.model.insertMany(carrito)
        return agregarCarrito;
    }

    async getById(id){
        let carritoBuscado = await this.model.find({_id:id}).lean();
        return carritoBuscado;
    }

    async updateById(id, productos){
        let carritoActualizado = this.model.updateOne({_id:id},{$set:{productos:productos}});
        return carritoActualizado;
    }

    async deleteById(id){
        await this.model.deleteOne({_id:id});
    }
}

export { ContenedorCarritosMongoDb };