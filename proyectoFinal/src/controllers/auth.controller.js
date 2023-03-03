

class AuthController{

    static async getRegistro (req, res) {
        if(req.session.flash.mensajeRegistro){
            res.render("errorRegistro",{
                mensaje: req.session.flash.mensajeRegistro
            })
        }else{
            res.render("registro")
        }
    };

    static async getLogin (req, res) {
        if(req.session.flash.mensajeInicio){
            res.render("errorLogin",{
                mensaje: req.session.flash.mensajeInicio
            })
        }else{
            res.render("login")
        }
    };

}

export { AuthController }