const path = require("path");

const options = {
    mariaDB: {
        client:"mysql",
        connection:{
            host:"127.0.0.1",
            user:"root",
            password:"",
            database:"ecommerce"
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
        urlDatabase: "mongodb+srv://ferastrozombie:flemita666@ecommerce.amqtcgi.mongodb.net/sesionesDB?retryWrites=true&w=majority",
    }
}

module.exports = options;