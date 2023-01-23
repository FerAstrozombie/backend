const getRandoms = require("./randoms.js")

process.send("listo para funcionar");

process.on("message", (parentMsg) => {
    if(parentMsg){
        let resultado = getRandoms(parentMsg);
        process.send(resultado);
    }
    return
})