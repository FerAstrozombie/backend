import express  from "express";
import mongoose from "mongoose";
import { Strategy as LocalStrategy } from "passport-local";
import { options } from "../config/databaseConfig.js";
import passport from "passport";
import { UserModel } from "../models/users.js";
import { transporter } from "../messages/email.js";
const authRouter = express.Router();
const optionsDB = options

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

mongoose.createConnection(optionsDB.mongoAtlasSessions.urlDatabaseUsers,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},(error)=>{
    if(error) console.log("conexion fallida", error);
    console.log("base de datos conectada correctamente");
})

passport.use("signupStrategy", new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password"
    },
    async (req, email, password, done) => {

        const user = await UserModel.findOne({email: email});
        if(user){
            return done(null, false, req.flash("mensajeRegistro", "El email ya se encuentra registrado"));

        }else{
            const newUser = new UserModel();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.nombre = req.body.nombre;
            newUser.direccion = req.body.nombre;
            newUser.edad = req.body.edad;
            newUser.telefono = req.body.telefono;
            await newUser.save();
            let user = JSON.stringify(newUser)
            transporter.sendMail({
                from: "Server app Node",
                to: "novella.effertz@ethereal.email",
                subject: "Nuevo registro",
                text: user           
            })
            done(null, newUser);
        }

    }
));

passport.use("loginStrategy", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, async(req, email, password, done) => {
    const user = await UserModel.findOne({email:email});
    if(!user){
        return done(null, false, req.flash("mensajeInicio", "Usuario no encontrado"));
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash("mensajeInicio", "Contraseña incorrecta"));
    }
    done(null, user);
}))

authRouter.get("/registro", async(req, res) => { 
    if(req.session.flash.mensajeRegistro){
        res.render("errorRegistro",{
            mensaje: req.session.flash.mensajeRegistro
        })
    }else{
        res.render("registro")
    }
});

/* authRouter.post("/registro", (req, res) => {
    let user = JSON.stringify(req.body) 
    console.log(user);
    transporter.sendMail({
        from: "Server app Node",
        to: "novella.effertz@ethereal.email",
        subject: "Email de prueba",
        text: user           
    })
    res.redirect("login")
}) */
authRouter.post("/registro", passport.authenticate("signupStrategy",{
    successRedirect: "/productos",
    failureRedirect: "/registro",
    passReqToCallback: true
}));


authRouter.get("/login", (req, res) => {
    if(req.session.flash.mensajeInicio){
        res.render("errorLogin",{
            mensaje: req.session.flash.mensajeInicio
        })
    }else{
        res.render("login")
    }
})

authRouter.post("/login", passport.authenticate("loginStrategy",{
    passReqToCallback: true,
    successRedirect: "/productos",
    failureRedirect: "/login",
}));

authRouter.get("/logout", (req, res) =>{
    req.session.destroy(err => {
        if(err) return res.redirect("/productos");
        res.render("login");
    });
});

export {authRouter, isAuthenticated}