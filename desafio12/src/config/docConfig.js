import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./config.js";

const PORT = options.server.PORT;

const docOptions={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Documentacion",
            description:"Crud de productos",
            version:"1.0.0"
        },
        servers:[{url:`http://localhost:${PORT}`}],
    },
    apis:["./src/docs/**/*.yaml"]
};

export const swaggerSpecs= swaggerJsDoc(docOptions);