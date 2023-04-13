import nodemailer from "nodemailer";
import { options } from "../config/config.js"

const transporter = nodemailer.createTransport({
    host: options.nodemailer.host,
    port: options.nodemailer.port,
    auth: {
        user: options.nodemailer.user,
        pass: options.nodemailer.token
    }
});

export { transporter }