import admin from "firebase-admin"

class ContenedorCarritosFirebase {
    constructor(opciones, contenedorColecciones){        
        this.db = admin.firestore();
        this.cartColection = this.db.collection("carritos");
    }
    
    async getAll(){
        const snapshot = await this.cartColection.get();
        const docs = snapshot.docs;
        let carritos =  docs.map(doc => {
            return {
                id: doc.id,
                productos: doc.data().productos
            }
        })
        return carritos;
    }

    async save(carrito){
        const doc = this.cartColection.doc();
        await doc.create(carrito);
    }

    async getById(id){
        const snapshot = await this.cartColection.get();
        const docs = snapshot.docs;
        let carritos =  docs.map(doc => {
            return {
                id: doc.id,
                productos: doc.data().productos
            }
        })
        let carrito = carritos.find(el => el.id === id)
        return carrito;
    }

    async updateById(id, timestamp, productos){
        const doc = this.cartColection.doc(id);
        let resultado = await doc.update({"timestamp":timestamp, "productos":productos})
        return resultado
    }

    async deleteById(id){
        const doc = this.cartColection.doc(id);
        let resultado = await doc.delete()
        return resultado
    }
}

export { ContenedorCarritosFirebase };