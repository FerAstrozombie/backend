import express from "express";
import { router } from "./routes/index.js";
import path from "path";
import __dirname from "../utils.js";
import handlebars from "express-handlebars";
import { logger } from "./loggers/logger.js";
import multer from "multer";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import { options } from "./config/config.js";
import { connectMongoDB } from "./config/dbConnection.js";

connectMongoDB();
const app = express();

/* establecemos el directorio publico */
app.use('/public', express.static(__dirname + '/src/public'));
app.use(express.static(path.join(__dirname, '/src/public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* Definimos donde guardaremos las sesiones */
app.use(session({
    store:MongoStore.create({
        mongoUrl:options.mongo.url
    }),
    secret: options.server.SECRET_SESSION,
    resave:false,
    saveUninitialized:false
}));

/* Inicializamos passport */
app.use(passport.initialize());
app.use(passport.session());

/* configuramos el motor de plantillas */
app.engine("hbs",handlebars.engine({extname:".hbs"}));
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "hbs");

/* establecemos la configuracion del almacenamiento de las imagenes */
const storage = multer.diskStorage({
    destination: path.join(__dirname, "src/public/uploads"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
app.use(multer({
    storage: storage,
    dest: path.join(__dirname, "/src/public/uploads")
}).single("avatar"));

/* establecemos el ruteo */
app.use(router);

/* ponemos a correr el servidor */
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>logger.info(`Server listening on port ${PORT}`));

export {app};