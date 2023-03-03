import { UserService } from "../services/user.service.js";

class UserController{
    static async getUsers (req, res){
        try {
            const users = await UserService.getUsers();
            res.render("home",{
                users: users,
            })
        } catch (error) {
            res.status(400).json({
                status: "ERROR",
                message:`Hubo un error ${error}`
            })
        }
    };

    static async saveUser (req, res){
        try {
            const response = await UserService.saveUser(req.body);
            res.status(200).json({
                status: "SUCESS",
                user: response
            })
        } catch (error) {
            res.status(400).json({
                status: "ERROR",
                message:`Hubo un error ${error}`
            })
        }
    };

    static async getById (req, res){
        try {
            const response = await UserService.getById(req.params.id);
            res.status(200).json({
                status: "SUCESS",
                user: response
            })
        } catch (error) {
            res.status(400).json({
                status: "ERROR",
                message:`Hubo un error ${error}`
            })
        }
    };

}

export { UserController }