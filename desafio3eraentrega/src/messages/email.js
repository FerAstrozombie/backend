import nodemailer from "nodemailer";
import { envConfig } from "../envConfig.js";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: envConfig.GMAIL,
        pass: envConfig.TOKENGMAIL
    }
});

export { transporter }