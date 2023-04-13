import { ContenedorMysql } from "../../managers/mysql.manager.js";

class ProductMysqlDao extends ContenedorMysql{
    constructor(options, tablename){
        super(options, tablename)
    }
}

export { ProductMysqlDao }