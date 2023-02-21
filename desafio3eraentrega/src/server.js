import express  from "express";
import routerProductos from "./web/routerProductos.js"
import routerCarrito from "./web/routerCarritos.js";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import { options } from "./config/databaseConfig.js";
import { ContenedorDaoProductos } from "./daos/index.js";
import { authRouter, isAuthenticated } from "./web/authRouter.js";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import { UserModel } from "./models/users.js";
import { logger } from "./loggers/logger.js"
import multer from "multer";
const productosApi = ContenedorDaoProductos;
const optionsDB = options;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsFolder = path.join(__dirname,"views");
const app = express();
const PORT = 8080;
const server = app.listen( PORT, ()=>{logger.info(`Server listening on port: ${PORT}`);})

app.use(express.static(__dirname +"/public"));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: optionsDB.mongoAtlasSessions.urlDatabase
    }),
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
})
passport.serializeUser((user, done) => {
    return done(null, user.id)
});
passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
});
app.engine("handlebars",handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine","handlebars");
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
app.use(multer({
    storage: storage,
    dest: path.join(__dirname, "public/uploads")
}).single("avatar"));
app.use("/api",routerCarrito);
app.use("/api",routerProductos);
app.use(authRouter)

app.get("/", isAuthenticated, async (req, res) => {
    let id = req.session.passport.user        
    const user = await UserModel.findById(id).lean();
    let usuario = []
    usuario.push(user)
    res.render("home",{
        user: usuario
    })
})

app.get("/productos", isAuthenticated, async(req, res, next) => {
    let id = req.session.passport.user        
    const user = await UserModel.findById(id);
    let userEmail = user.email
    const productos = await productosApi.getAll()
    res.render("productos",{
        productos : productos,
        compare: productos.length > 0,
        user: userEmail
    })
});

app.get("/listadeproductos", isAuthenticated, async(req, res, next) => {
    const productos = await productosApi.getAll()
    res.render("listadeproductos",{
        productos: productos,
        compare: productos.length > 0,
    })    
})