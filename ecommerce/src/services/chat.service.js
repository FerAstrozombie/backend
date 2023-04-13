import { getApiDao } from "../model/index.js";
import { options } from "../config/config.js";
import { ChatModel } from "../model/dbmodels/chat.model.js"

const { ChatManager } = await getApiDao(options.server.DV_TYPE);

class ChatService{

    static async getAll(){
        return await ChatManager.getAll()
    }

    static async getChatsById(id){
        const chats = await ChatManager.getById(id);
        return chats;
    };

    static async saveChat(body){
        return await ChatManager.save(body);
    };

    static async getChatByUser(user){
        return await ChatModel.find({autor: user});
    }
};

export { ChatService }