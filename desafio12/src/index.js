import axios from "axios";
import { logger } from "./loggers/logger.js"

const URL = "http://localhost:8080";

const testGetProducts = async()=>{
    try {
        const response = await axios.get(`${URL}/productos`);
        logger.info(response.data);
    } catch (error) {
        logger.error(error)
    }
};

const testSaveProducts = async () => {
    try {
        const response = await axios.post(`${URL}/productos`,{
            nombre: "gorra pikachu",
            descripcion: "gorra pikachu",
            url: "https://unaimagen.jpg",
            precio: 1234,
            stock: 222
        });
        logger.info(response)
    } catch (error) {
        logger.error(error);
        
    }
};

const testGetProductsById = async (id) => {
    try {
        const response = await axios.get(`${URL}/productos/${id}`)
        console.log(response);
    } catch (error) {
        logger.error(error);
    }
}

const testDeleteById = async (id) => {
    try {
        const response = await axios.delete(`${URL}/productos/${id}`)
        logger.info(response);
    } catch (error) {
        logger.error(error);
    }
}

/* testGetProducts();
testSaveProducts();
testGetProductsById("64107b6e7bc649ebf3667fcb");
testDeleteById("64107b6e7bc649ebf3667fcb");
 */