import mongoose from "mongoose";
import { options } from "./config.js";
import { logger } from "../loggers/logger.js";

export const connectMongoDB = async()=>{
    try {
        await mongoose.connect(options.mongo.url);
        logger.info("base de datos conectada")
    } catch (error) {
        logger.error(`Hubo un error al conectarse a la base de datos ${err}`)
    }
};