import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'fernandopunk77@gmail.com',
        pass: 'roqorrextdvszpak'
    }
});

export { transporter }