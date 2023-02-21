import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const envConfig = {
    KEY_DATABASE: process.env.KEY_DATABASE,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    IDTWILIO: process.env.IDTWILIO,
    TOKENTWILIO: process.env.TOKENTWILIO,
    TWILIOPHONEWHATSAPP: process.env.TWILIOPHONEWHATSAPP,
    ADMINPHONE: process.env.ADMINPHONE
};

export {envConfig};