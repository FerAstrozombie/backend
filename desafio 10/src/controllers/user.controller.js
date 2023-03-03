import { UserServices } from "../services/user.service.js"

class UserController{
    static async getUsers (req, res){
        try {
            const response = await UserServices.getUsers()
            res.status(200).json({
                status: "Sucess",
                data: response
            })
        } catch (error) {
            res.status(400).json({
                status : "Error",
                message: `Hubo un error: ${error}`
            });
        }
    };

    static async saveUsers (req, res){
        try {
            const response = await UserServices.saveUser(req.body)
            res.status(200).json({
                status: "Sucess",
                data: response
            })
        } catch (error) {
            res.status(400).json({
                status : "Error",
                message: `Hubo un error: ${error}`
            });
        }
    }
}

export { UserController }