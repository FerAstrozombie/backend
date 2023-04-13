import log4js from "log4js";

log4js.configure({
    //definir la salida de los registros
    appenders:{
        consola:{type:"console"},
        archivoErrores:{type:"file", filename:"./src/logs/errors.log"},
        //creamos salidas con niveles
        loggerConsola:{type:"logLevelFilter", appender:"consola", level:"info"},
        loggerErrores:{type:"logLevelFilter", appender:"archivoErrores", level:"error"},
    },
    categories:{
        default:{appenders:['loggerConsola','loggerErrores'],level:'all'},
        production:{appenders:['loggerErrores'], level:'all'}
    }
});

const logger =log4js.getLogger();

export { logger }