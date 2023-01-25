const express = require("express");
const faker = require("@faker-js/faker");
const  Contenedor = require("./products");
const Chat = require("./chat");
const optionsDB = require("./config/databaseConfig");
const ContenedorSql = require("./contenedorSql");
const app = express();
const { Server } = require("socket.io");
const path = require('path')
const productServices = new Contenedor("productos.txt");
const chatApi = new Chat("chats.txt")
const productosApi = new ContenedorSql(optionsDB.mariaDB, "productos");
/* const chatApi = new ContenedorSql(optionsDB.sqliteDB, "chat"); */
const parseArgs = require("minimist")
const options = {default:{
    PORT:8080
}}
const argumentos = parseArgs(process.argv.slice(2),options);
const PORT = argumentos.PORT;
const server = app.listen( PORT, ()=>{console.log(`Server listening on port: ${PORT}`);})
const io = new Server(server);
const handlebars = require("express-handlebars");
const viewsFolder = path.join(__dirname,"views")
const { normalize, schema} = require("normalizr");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileStrategy = require("session-file-store");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const UserModel = require("./models/users.js");
const flash = require("connect-flash");
const randomRouter = require("./web/randomRouter.js");
const routerProductos = require("./web/routerProductos.js");

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars",handlebars.engine());
app.set("views", viewsFolder);
app.set("view engine","handlebars");
app.use(cookieParser());

mongoose.connect(optionsDB.mongoAtlasSessions.urlDatabaseUsers,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},(error)=>{
    if(error) console.log("conexion fallida");
    console.log("base de datos conectada correctamente");
})

app.use(session({
    store: MongoStore.create({
        mongoUrl: optionsDB.mongoAtlasSessions.urlDatabase
    }),
    secret: "claveSecreta",
    resave:false,
    saveUninitialized:false,
}));

app.use(randomRouter);
app.use(routerProductos);

app.use(flash());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.mensajeRegistro = req.flash("mensajeRegistro");
    app.locals.mensajeLogueo = req.flash("mensajeLogueo");
    next();
})

//Defino los schemas de los mensajes
const authorSchema = new schema.Entity("author",{})
const mensajeSchema = new schema.Entity("mensaje",
    {
        author:authorSchema
    }
);
const chatSchema = new schema.Entity("chats",
    {
        mensajes:[mensajeSchema]
    }
);

//Normalizo los chats
const normalizarData = (data)=>{
    const dataNormalizada = normalize({id: "chatHistory", mensajes: data}, chatSchema);
    return dataNormalizada;
}
const normalizarMensajes = async () =>{
    const mensajes = await chatApi.getAll();
    const mensajesNormalizados = normalizarData(mensajes);
    return mensajesNormalizados;
}

passport.serializeUser((user, done) => {
    return done(null, user.id)
});
passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
});

io.on("connection", async (socket) => {
    
    console.log("Nuevo cliente conectado");
    socket.emit("products", await productosApi.getAll());
    socket.emit("mensajesChat", await normalizarMensajes());
    socket.on("newProduct", async(data) => {
        await productosApi.save(data);        
        io.sockets.emit("products", await productosApi.getAll());
    })
    socket.on("nuevoMensaje", async (data) => {        
        await chatApi.save(data);
        io.sockets.emit("mensajesChat", await normalizarMensajes());
    })
});

app.get("/",(req,res) =>{    
        res.render("home");    
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

app.get("/productos-test", async(req, res) => {
    faker.faker.locale = "es"
    let productosFaker = [];
    for(let i=0; i<5; i++){
        productosFaker.push(
            {
                title: faker.faker.commerce.productName,
                price: faker.faker.commerce.price,
                url: faker.faker.image.fashion,
            }
        )
    }
    res.render("test",{
        productos: productosFaker
    })
});

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
}))

app.get("/registro", (req, res) => { 
    if(req.session.flash.mensajeRegistro){
        res.render("errorRegistro",{
            mensaje: req.session.flash.mensajeRegistro
        })
    }else{
        res.render("registro")
    }
});

app.post("/registro", passport.authenticate("signupStrategy",{
    successRedirect: "/productos",
    failureRedirect: "/registro",
    passReqToCallback: true
}));



app.get("/login", (req, res) => {
    if(req.session.flash.mensajeInicio){
        res.render("errorLogin",{
            mensaje: req.session.flash.mensajeInicio
        })
    }else{
        res.render("login")
    }
})

app.post("/login", passport.authenticate("loginStrategy",{
    passReqToCallback: true,
    successRedirect: "/productos",
    failureRedirect: "/login",
}));

app.get("/logout", (req, res) =>{
    req.session.destroy(err => {
        if(err) return res.redirect("/productos");
        res.render("login");
    });
});

app.get("/info",(req, res) => {
    res.json({
        "Argumentos de entrada": argumentos.PORT,
        "Sistema operativo": process.platform,
        "Version de NodeJs": process.version,
        "Memoria total reservada": process.memoryUsage().rss,
        "Path de ejecucion": process.execPath,
        "Process id": process.pid,
        "Carpeta del proyecto": process.cwd(),
    })
})

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
