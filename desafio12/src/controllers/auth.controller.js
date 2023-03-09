import passport from "passport";
import { authPassport } from "../auth/passport.js";
import { convertUserToDto } from "../model/dtos/user.dto.js";

authPassport(passport);

class AuthController{

    static postSignupPassport = passport.authenticate("signupStrategy",{
        failureRedirect:"/registro",
        failureMessage:true
    });

    static postSignup(req,res){
        res.redirect("/productos");
    };

    static logout(req,res){
        req.session.destroy(err => {
            if(err) return res.redirect("/productos");
            res.render("login");
        });
    }

    static getRegistro(req, res) { 
        if(req.session.messages){
            res.render("errorRegistro",{
                mensaje: req.session.messages
            })
        }else{
            res.render("registro")
        }
    }

    static postLoginPassport = passport.authenticate("loginStrategy",{
        failureRedirect:"/login",
        failureMessage:true
    });

    static getLogin(req, res) { 
        if(req.session.messages){
            res.render("errorLogin",{
                mensaje: req.session.messages
            })
        }else{
            res.render("login")
        }
    }

    static getPerfil(req, res) {
        const userDto = convertUserToDto(req.user)
        res.render("home",{
            user: userDto
        })
    }
}

export { AuthController }