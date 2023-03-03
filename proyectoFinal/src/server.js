import express from "express";
import { connectMongoDB } from "./config/dbConnection.js";
import { logger } from "./logger/logger.js";
import { router } from "./routes/index.js";
import handlebars from "express-handlebars";
import path from "path";
import { options } from "./config/config.js";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import { UserModel } from "./models/dbModels/user.model.js";

connectMongoDB();
const app = express();

app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    store: options.mongoSession.store,
    secret: "claveSecreta",
    resave:false,
    saveUninitialized:false,
}));
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    app.locals.mensajeRegistro = req.flash("mensajeRegistro");
    app.locals.mensajeLogueo = req.flash("mensajeLogueo");
    next();
});
passport.serializeUser((user, done) => {
    return done(null, user.id)
});
passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
});

app.engine("hbs",handlebars.engine({extname:".hbs"}));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs");

app.use(router)

const PORT = options.server.PORT;
app.listen(PORT,()=>logger.info(`Server listening on port ${PORT}`));
