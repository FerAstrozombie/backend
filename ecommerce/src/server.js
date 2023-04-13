import express from "express";
import { router } from "./routes/index.js";
import path from "path";
import __dirname from "../utils.js";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { options } from "./config/config.js";
import { logger } from "./loggers/logger.js";
import { Server } from "socket.io";
import multer from "multer";
import { ChatService } from "./services/chat.service.js";
import  {ChatModel } from "./model/dbmodels/chat.model.js";

const app = express();
app.use('/public', express.static(__dirname + '/src/public'));
app.use(express.static(path.join(__dirname, '/src/public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    store:MongoStore.create({
        mongoUrl:options.mongo.url
    }),
    secret: options.server.SECRET_SESSION,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine("hbs",handlebars.engine({extname:".hbs"}));
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "hbs");
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

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>logger.info(`Server listening on port ${PORT}`));

//Configuracion del socket
const io = new Server(server);

io.on("connection", async (socket) => {
    logger.info("Nuevo cliente conectado");
    socket.emit("mensajesChat", await ChatModel.find());
    socket.on("nuevoMensaje", async (data) => {   
        await ChatModel.create(data) ;
        const dataEnviada = await ChatModel.find()
        io.sockets.emit("mensajesChat", dataEnviada);
    })
});

app.use(router);

export {app};