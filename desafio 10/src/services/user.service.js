import { UserManager } from "../dbOperations/index.js";

class UserServices {
    static async getUsers(){
        return await UserManager.getAll();
    }

    static async saveUser(body){
        return await UserManager.save(body)
    }
}

export { UserServices }