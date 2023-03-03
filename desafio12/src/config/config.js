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
    }
}
