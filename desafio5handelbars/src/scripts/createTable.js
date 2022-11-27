const options = require("../config/databaseConfig");
const knex = require("knex");

const databaseMariadb = knex(options.mariaDB);
const databaseSqlite = knex(options.sqliteDB);

const creteTables = async () =>{
    try {
        let productosTable = await databaseMariadb.schema.hasTable("productos");
        if(productosTable){
            await databaseMariadb.schema.dropTable("productos");
        }
        await databaseMariadb.schema.createTable("productos", table =>{
            table.increments("id");
            table.string("title",40).nullable(false);
            table.integer("price").nullable(false);
            table.string("url",300).nullable(false);
        });
        console.log("tabla de productos creada");

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
        console.log("tala de mensajes creada");
    } catch (error) {
        console.log(error);
    }
    databaseMariadb.destroy();
    databaseSqlite.destroy();
}
creteTables();