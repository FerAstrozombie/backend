import bcrypt from "bcrypt";
import { UserModel } from "../model/dbmodels/user.model.js";
import {Strategy as LocalStrategy} from "passport-local";

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
                const user = await UserModel.findOne({email:username});
                if(user) return done(null, false, {message:"El usuario ya esta registrado"});
                const newUser = {
                    email:username,
                    password:createHash(password),
                    nombre:req.body.nombre,
                    apellido:req.body.apellido,
                    dni: req.body.dni,
                };
                const userCreated = await UserModel.create(newUser);
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

