import bcrypt from "bcrypt";
import { UserModel } from "../model/dbmodels/user.model.js";
import {Strategy as LocalStrategy} from "passport-local";
import { CartSevice } from "../services/cart.service.js";
import { transporter } from "../messages/email.js";
import { options } from "../config/config.js"

const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};

const authPassport = (passport)=>{
    
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    });
    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id);
        done(null, user);
    });

    passport.use("signupStrategy", new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:"email"
        },
        async (req,username,password, done)=>{
            try {
                const carrito = {
                    productos: []
                }
                let carritoCreado = await CartSevice.saveCart(carrito)
                const user = await UserModel.findOne({email:username});
                if(user) return done(null, false, {message:"El usuario ya esta registrado"});
                let urlImg = `http://localhost:8080/public/uploads/${req.file.originalname}`
                const newUser = {
                    email:username,
                    password: createHash(password),
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    dni: req.body.dni,
                    avatar: urlImg,
                    carrito: carritoCreado,                    
                };
                const userCreated = await UserModel.create(newUser);
                const emailTemplate = `<div>
                                    <h1>Nuevo usuario registrado</h1>
                                    <h3>Usuario: ${newUser.nombre}</h3>
                                    <h3>Apellido: ${newUser.apellido}</h3>
                                    <h3>Email: ${newUser.email}</h3>
                                    </div>`
                transporter.sendMail({
                    from: "Server app Node",
                    to: options.nodemailer.user,
                    subject: "Nuevo usuario registrado",
                    html: emailTemplate           
                });
                return done(null, userCreated,{message:"Usuario registrado exitosamente"});
            } catch (error) {
                return done(null, false, {message:`Error al autenticar al usuario ${error}`});
            }
        }
    ))

    passport.use("loginStrategy", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    }, async(req, email, password, done) => {
        const user = await UserModel.findOne({email:email});
        if(!user){
            return done(null, false, {message:"Usuario no encontrado"});
        }
        if(!user.comparePassword(password)){
            return done(null, false, {message: "Contraseña incorrecta"});
        }
        done(null, user);
    }))
};

export {authPassport};

