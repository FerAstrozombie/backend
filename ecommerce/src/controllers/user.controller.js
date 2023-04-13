import { UserService } from "../services/user.service.js";
import { UserModel } from "../model/dbmodels/user.model.js"

class UserController {

    static async getPerfil(req, res){
        let id = req.session.passport.user  
        const user = await UserService.getUserById(id)
        res.render("editPerfil",{
            user
        })      
    };

    static async updatePerfil(req, res){
        let id = req.session.passport.user
        const { nombre, apellido, email, dni } = req.body
        const response = await UserModel.updateOne({_id : id}, {$set: {nombre : nombre, apellido : apellido, email: email, dni : dni}})
        res.redirect("/")      
    }

}

export { UserController }