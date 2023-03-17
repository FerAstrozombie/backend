import admin from "firebase-admin"

class ContenedorProductosFirebase {
    constructor(opciones, contenedorColecciones){
        this.database = admin.initializeApp(
            {
                credential: admin.credential.cert(opciones),
                databaseURL: `https://${contenedorColecciones}.firebase.io`,
            }
        );
        this.db = admin.firestore();
        this.productColection = this.db.collection("prodcutos");
    }
    
    async getAll(){
        const snapshot = await this.productColection.get();
        const docs = snapshot.docs;
        let productos =  docs.map(doc => {
            return {
                id: doc.id,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                url: doc.data().url,
                precio: doc.data().precio,
                stock: doc.data().stock
            }
        })
        return productos;
    }

    async save(producto){
        const doc = this.productColection.doc();
        await doc.create(producto);
    }

    async getById(id){
        const snapshot = await this.productColection.get();
        const docs = snapshot.docs;
        let productos =  docs.map(doc => {
            return {
                id: doc.id,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                url: doc.data().url,
                precio: doc.data().precio,
                stock:doc.data().stock                
            }
        })
        let producto = productos.find(el => el.id === id)
        return producto;
    }

    async updateById(id, nombre, descripcion, url, precio, stock){
        const doc = this.productColection.doc(id);
        let resultado = await doc.update({"nombre":nombre, "descripcion":descripcion, "url": url, "precio":precio, "stock":stock})
        return resultado
    }

    async deleteById(id){
        const doc = this.productColection.doc(id);
        let resultado = await doc.delete()
        return resultado
    }
}

export { ContenedorProductosFirebase };