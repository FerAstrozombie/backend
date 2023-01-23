const express = require("express");

const randomRouter = express.Router();

const { fork } = require("child_process");

randomRouter.get("/api/randoms/:cant", (req, res) => {
    let cantidad = parseInt((req.params.cant));
    const child = fork("./src/child.js");
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

module.exports = randomRouter