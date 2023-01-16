const fs = require("fs");

class Chat {
    constructor(name) {
        this.filename = name; 
    }

    save = async(chat)=>{
        try {
            //leer si el archivo existe
            if(fs.existsSync(this.filename)){
                const chats = await this.getAll();
                const lastIdAdded = chats.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0);
                const newChat={
                    id: lastIdAdded+1,
                    ...chat
                }
                chats.push(newChat);
                await fs.promises.writeFile(this.filename, JSON.stringify(chats, null, 2))
                return chats;
            } else {
                // si el archivo no existe
                const newChat={
                    id:1,
                    ...chat
                }
                //creamos el archivo
                await fs.promises.writeFile(this.filename, JSON.stringify([newChat], null, 2));
            }
        } catch (error) {
            console.log("error saving",error);
        }
    }

    // funcion para obtener todos los chats
    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.filename, "utf-8");
            if(contenido.length > 0){
                const chats = JSON.parse(contenido);
                return chats;
            }else {
                return [];
            }            
        } catch (error) {
            return "No se pudo leer el archivo";
        }
    }
}

module.exports = Chat