import { MongoContainer } from "../../managers/mongo.manager.js";

class ChatsMongoDao extends MongoContainer{
    constructor(model){
        super(model);
    }
};

export { ChatsMongoDao }