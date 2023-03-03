import express from "express";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import { UserModel } from "../../models/dbModels/user.model.js";
import { AuthController } from "../../controllers/auth.controller.js";
import { CartManager } from "../../models/index.js";
const router = express.Router();

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
            const carrito = {
                productos: []
            };
            let carritoCreado = await CartManager.saveCart(carrito);
            const newUser = new UserModel();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.nombre = req.body.nombre;
            newUser.direccion = req.body.nombre;
            newUser.edad = req.body.edad;
            newUser.telefono = req.body.telefono;
            newUser.carrito = carritoCreado;
            await newUser.save();
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
}));

router.get("/registro", AuthController.getRegistro);
router.post("/registro", passport.authenticate("signupStrategy",{
    successRedirect: "/productos",
    failureRedirect: "/registro",
    passReqToCallback: true
}));
router.post("/login", passport.authenticate("loginStrategy",{
    passReqToCallback: true,
    successRedirect: "/productos",
    failureRedirect: "/login",
}));
router.get("/login", AuthController.getLogin)

router.get("/logout", (req, res) =>{
    req.session.destroy(err => {
        if(err) return res.redirect("/productos");
        res.render("login");
    });
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

export {router as authRouter, isAuthenticated}
