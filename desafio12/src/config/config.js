import dotenv from "dotenv";
import ParseArgs from "minimist";

dotenv.config();

const objArgs = ParseArgs(process.argv.slice(2),{
    alias:{
        p: "port",
        m: "mode",
        e: "env"
    },
    default:{
        port: 8080,
        modo: "FORK",
        env: "DEV"
    }
});

export const options = {
    server:{
        PORT: objArgs.port,
        MODE: objArgs.modo,
        NODE_ENV: objArgs.env,
        DV_TYPE: process.env.DV_TYPE || "mongo"
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    mariaDB: {
        client:"mysql",
        connection:{
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": process.env.PROYECT_ID,
        "private_key_id": process.env.PRIVETE_KEY_ID,
        "private_key": process.env.PRIVATE_KEY,
        "client_email": process.env.CLIENT_EMAIL,
        "client_id": process.env.CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
    }
}
