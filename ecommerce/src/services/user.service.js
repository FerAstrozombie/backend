import { getApiDao } from "../model/index.js";
import { options } from "../config/config.js";
import { convertUserToDto } from "../model/dtos/user.dto.js";

const { UserManager } = await getApiDao(options.server.DV_TYPE);

class UserService {

    static async udpdatePerfil(body, id){
        return await UserManager.updateById(body, id)
    }

    static async getUserById(id){
        return convertUserToDto( await UserManager.getById(id));

    }

}

export { UserService }