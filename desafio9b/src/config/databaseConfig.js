const path = require("path");
const envConfig = require("../envConfig.js");

const options = {
    mariaDB: {
        client:"mysql",
        connection:{
            host:envConfig.HOST,
            user:envConfig.USER,
            password:envConfig.PASSWORD,
            database:envConfig.DATABASE
        }
    },
    sqliteDB:{
        client:"sqlite",
        connection:{
            filename:path.join(__dirname, "../DB/chatdb.sqlite")
        },
        useNullAsDefault:true
    },
    mongoAtlasSessions:{
        urlDatabase: `mongodb+srv://${envConfig.KEY_DATABASE}@ecommerce.amqtcgi.mongodb.net/sesionesDB?retryWrites=true&w=majority`,
        urlDatabaseUsers: `mongodb+srv://${envConfig.KEY_DATABASE}@ecommerce.amqtcgi.mongodb.net/users?retryWrites=true&w=majority`,
    }
}

module.exports = options;