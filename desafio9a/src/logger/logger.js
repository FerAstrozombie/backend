const log4js = require("log4js");

log4js.configure({
    appenders:{
        consola: {type: "console"},
        warnings:{type:"file", filename:"logs/warning.log"},
        errores:{type:"file", filename:"logs/errores.log"},
        consolaInfo:{type: "logLevelFilter", appender:"consola", level:"info"},
        archivoWarning:{type:"logLevelFilter", appender:"warnings", level:"warn"},
        archivoErrores:{type:"logLevelFilter", appender:"errores", level:"error"}
    },
    categories:{
        default: {appenders: ["consolaInfo"], level:"all"},
        archivo: {appenders:["archivoWarning","archivoErrores"], level:"all"},
        
    }
});

const logger = log4js.getLogger("archivo");

module.exports = logger;



