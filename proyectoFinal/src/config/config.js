import dotenv from "dotenv";
import ParsedArgs from "minimist";
import MongoStore from "connect-mongo";

dotenv.config();

const objArgs = ParsedArgs(process.argv.slice(2), {
    alias:{
        p:"port",
        m:"mode",
        e:"env"
    },
    default:{
        port:8080,
        mode:"FORK",
        env:"DEV"
    }
});

export const options = {
    server:{
        PORT:objArgs.port,
        MODE:objArgs.mode,
        NODE_ENV:objArgs.env
    },
    mongo:{
        url:process.env.MONGO_URL
    },
    mongoSession:{
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL
        }),
    },
    twilio:{
        idTwilio: process.env.IDTWILIO,
        tokenTwilio: process.env.TOKENTWILIO,
        twilioPhone: process.env.TWILIOPHONEWHATSAPP,
        adminPhone: process.env.ADMINPHONE
    },
    nodemailer:{
        host: process.env.HOSTNODEMAILER,
        port: process.env.PORTNODEMAILER,
        user: process.env.GMAIL,
        token: process.env.TOKENGMAIL
    }
};