import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'myrtice.marvin@ethereal.email',
        pass: 'j9ynmVcXKdSkgk4e3h'
    }
});

export { transporter }