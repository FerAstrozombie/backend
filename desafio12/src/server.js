import express from "express";
import { router } from "./routes/index.js";
import path from "path";
import __dirname from "../utils.js";
import handlebars from "express-handlebars";

const app = express();
app.use(express.static(path.join(__dirname, '/src/public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.engine("hbs",handlebars.engine({extname:".hbs"}));
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "hbs");

app.use(router)


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));