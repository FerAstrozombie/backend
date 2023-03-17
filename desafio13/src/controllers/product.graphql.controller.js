import {buildSchema} from "graphql";
import {graphqlHTTP} from "express-graphql";
import { rootProducts } from "../services/product.graphql.service.js";

const graphqlSchema = buildSchema(`
    type Product{
        _id: String,
        nombre: String,
        descripcion: String,
        url: String,
        precio: Int,
        stock: Int
        createdAt: String,
        updatedAt: String
    }
    input ProductInput{
        nombre: String,
        descripcion: String,
        url: String,
        precio: Int,
        stock: Int
    }
    type Query{
        getProducts: [Product],
        getProductById(id:String): Product
    }
    type Mutation{
        addProduct(product: ProductInput): Product,
        deleteProduct(id:String): String,
        updateProductById(id:String, product:ProductInput): Product
    }
`);

export const graphqlController = ()=>{
    return graphqlHTTP({
        schema:graphqlSchema,
        rootValue:rootProducts,
        graphiql:true
    });
};
