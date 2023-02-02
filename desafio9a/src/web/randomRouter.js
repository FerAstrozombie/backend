const express = require("express");
const getRandoms = require("../randoms.js")
const randomRouter = express.Router();
const { fork } = require("child_process");

randomRouter.get("/api/randoms/:cant", (req, res) => {
    let cantidad = parseInt((req.params.cant));
    const child = fork("child.js");
    child.on("message", (childMsg) => {
        if(isNaN(cantidad)){
            res.json({Mensaje: "Por favor ingrese un numero"})
        }else{
            if(childMsg == "listo para funcionar"){
                child.send(cantidad);
            }else{
                res.json(childMsg)
            }
        }     
    })
})

/* randomRouter.get("/api/randoms/:cant", (req, res) => {
    let cantidad = parseInt((req.params.cant));
    let resultado = getRandoms(cantidad);
    res.json({resultado});
}); */
module.exports = randomRouter