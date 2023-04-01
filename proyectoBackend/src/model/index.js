import { MongoContainer } from "./managers/mongo.manager.js";
import { UserModel } from "./dbModels/user.model.js";
export const UserManager = new MongoContainer(UserModel);