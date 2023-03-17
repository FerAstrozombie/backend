import { options } from "../config/config.js"
import knex from "knex";
import { logger } from "../loggers/logger.js"

const databaseMariadb = knex(options.mariaDB);

const creteTables = async () =>{
    try {
        let productosTable = await databaseMariadb.schema.hasTable("productos");
        if(productosTable){
            await databaseMariadb.schema.dropTable("productos");
        }
        await databaseMariadb.schema.createTable("productos", table =>{
            table.increments("id");
            table.string("nombre",40).nullable(false);
            table.string("descripcion",100).nullable(false);
            table.string("url",300).nullable(false);
            table.integer("precio").nullable(false);
            table.integer("stock").nullable(false);
        });
        logger.info("tabla de productos creada");
    } catch (error) {
        logger.error(error);
    }
    databaseMariadb.destroy();
}
creteTables();