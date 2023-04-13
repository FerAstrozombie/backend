import { MongoContainer } from "../model/managers/mongo.manager.js";
import { OrdenModel } from "../model/dbmodels/orden.model.js"

const OrdenManager = new MongoContainer(OrdenModel);

class OrdenService{

    static async createOrder(orden){
        return await OrdenManager.save(orden);
    };

    static async getOrderById(id){
        return await OrdenManager.getById(id);
    }
}

export { OrdenService }
