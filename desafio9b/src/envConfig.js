const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, "./.env")});


const envConfig = {
    KEY_DATABASE: process.env.KEY_DATABASE,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE
};

module.exports = envConfig;