import supertest from "supertest";
import  {app } from "../server.js";
import { expect } from "chai";

const request = supertest(app);

describe("api products endpoints", ()=>{
    it("get products endpoints", async ()=>{
        const response = await request.get("/productos");
        expect(response.status).equal(200);
        expect(response.body).to.have.own.property("productos")
    });

    it("post product endpoints, luego de guardar un producto este deberia tener un _id", async ()=>{
        const productTest = {nombre: "gorra", descripcion:"una gorra para usar", url: "https://unaimagen.jpg", precio: 3212, stock: 222}
        const response = await request.post("/productos").send(productTest);
        expect(response.status).equal(200);
        expect(response.body.productos).to.have.own.property("_id")
        const idProducto = response.body.productos._id
        const responseDelete = await request.delete(`/productos/${idProducto}`);
        expect(responseDelete.body.message.message).equal("delete successfully");

    });

    it("get product by _id endpoint, deberia obtener el producto segun su _id", async ()=>{
        const id = "640fd6af66aafbc67af07503"
        const response = await request.get(`/productos/${id}`);
        expect(response.status).equal(200);
        expect(response.body).to.have.own.property("producto");
    });
})