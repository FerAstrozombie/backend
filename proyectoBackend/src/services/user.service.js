import { UserManager } from "../models/index.js"

class UserService{
    static async getUsers(){
        return await UserManager.getAll();
    };

    static async saveUser(body){
        return await UserManager.save(body);
    }

    static async getById(id){
        return await UserManager.getById(id);
    }
};

export { UserService }