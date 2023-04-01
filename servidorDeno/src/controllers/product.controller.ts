import { Context, helpers, config, MongoClient, ObjectId } from "../../depts.ts";
import {Product} from "../types/product.ts";

const {MONGO_URL,DATABASE_NAME} = config();

//conexion de mongo
const client = new MongoClient();
try {
    await client.connect(MONGO_URL);
    console.log("conexion a la base de datos exitosa!")
} catch (error) {
    console.log(error)
}

const db = client.database(DATABASE_NAME);
const ProductModel = db.collection<Product>("products");

export const findProducts = async(ctx:Context)=>{
    try {
        const products = await ProductModel.find().toArray();
        ctx.response.status = 200;
        ctx.response.body = {status:"success", products}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = `Hubo un error ${error}`;
    }
};

export const findProductById = async(ctx:Context)=>{
    try {
        const {id} = helpers.getQuery(ctx,{mergeParams:true});
        const product = await ProductModel.findOne({_id: new ObjectId(id)});
        ctx.response.status = 200;
        ctx.response.body = {status:"success", product};
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = `Hubo un error ${error}`;
    }
};

export const createProduct = async(ctx:Context)=>{
    try {
        const body = await ctx.request.body().value;
        const productCreated = await ProductModel.insertOne(body);
        ctx.response.status = 200;
        ctx.response.body = {status:"success", message: `Producto creado con el id: ${productCreated}`}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = `Hubo un error ${error}`;
    }
};

export const deleteProduct = async(ctx:Context)=>{
    try {
        const {id} = helpers.getQuery(ctx,{mergeParams:true});
        await ProductModel.deleteOne({_id: new ObjectId(id)});
        ctx.response.status = 200;
        ctx.response.body = {status:"success", message: `Producto eliminado con el id: ${id}`};
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = `Hubo un error ${error}`;
    }
};