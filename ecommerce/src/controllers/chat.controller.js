import { ChatService } from "../services/chat.service.js";
import { UserModel } from "../model/dbmodels/user.model.js";

class ChatController{

    static async getData (req, res){
        const id = req.session.passport.user;
        const user = await UserModel.findById(id).lean();
        const chats = await ChatService.getChatByUser(user.email);
        res.render("chat",{
            user
        })
    };

    static async getChats(req, res){
        console.log(req);
        const id = req.session.passport.user;
        const usuario = await UserModel.findById(id).lean();
        const user = usuario.email
        const chats = await ChatService.getChatByUser();
        res.render("chat");
    }

    static async saveChat(req, res){
        const data = req.body
        await ChatService.saveChat(data)
    }

}

export { ChatController }