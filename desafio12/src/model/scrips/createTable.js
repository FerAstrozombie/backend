import { options } from "../../config/config.js";
import knex from "knex";
import { logger } from "../../loggers/logger.js"

const databaseSqlite = knex(options.sqliteDB);

const creteTables = async () =>{
    try {
        let chatTable = await databaseSqlite.schema.hasTable("chat");
        if(chatTable){
            await databaseSqlite.schema.dropTable("chat");
        }
        await databaseSqlite.schema.createTable("chat", table =>{
            table.increments("id");
            table.string("autor",70)
            table.string("mensaje", 300)
            table.string("hora",30)
        })
        logger.info("tabla de mensajes creada");
    } catch (error) {
        logger.error(error);
    }
    databaseSqlite.destroy();
}
creteTables();