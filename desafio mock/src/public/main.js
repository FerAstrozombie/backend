console.log("Js funcionando");

const socketClient = io();

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        url: document.getElementById("url").value
    }
    socketClient.emit("newProduct", product);
    productForm.reset();
});

const productsContainer = document.getElementById("productsContainer");
socketClient.on("products", async(data)=>{
    const templateTable = await fetch("./templates/table.handlebars");
    const templateFormat = await templateTable.text();
    const template = Handlebars.compile(templateFormat);
    const html = template({products:data});
    productsContainer.innerHTML = html;
})

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (event) =>{
    let today = new Date();
    let now = today.toLocaleString();
    event.preventDefault();
    const mensaje = {
        author:{
            id: document.getElementById("email").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            edad: document.getElementById("edad").value,
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value,
        },
        text: document.getElementById("mensajeChat").value,
        hora: now
    };
        socketClient.emit("nuevoMensaje", mensaje)
        chatForm.reset();
    
})
//Denormalizacion
//Defino los schemas de los mensajes
const authorSchema = new normalizr.schema.Entity("author",{},{idAttribute:"email"})
const mensajeSchema = new normalizr.schema.Entity("mensaje",
    {
        author:authorSchema
    }
);
const chatSchema = new normalizr.schema.Entity("chats",
    {
        mensajes:[mensajeSchema]
    }
);

const chatContainer = document.getElementById("chatContainer");
socketClient.on("mensajesChat", async (data) => {
    const dataNueva = normalizr.denormalize(data.result, chatSchema,data.entities);
    let mensajesElemento = "";

    console.log("data normalizada:",JSON.stringify(data, null, "\t").length);
    console.log("data normal:",JSON.stringify(dataNueva, null, "\t").length);

    const normalDataSize = JSON.stringify(dataNueva, null, "\t").length;
    const dataNormalizadaSize = JSON.stringify(data, null, "\t").length;
    const porcentaje = ((normalDataSize - dataNormalizadaSize) / normalDataSize) * 100;

    dataNueva.mensajes.forEach(msj=>{
        mensajesElemento += `
                            <div class="contenedor">
                                <div class="chat">
                                    <div class="chatBurbuja"><strong>${msj.author.id} - ${msj.hora}</strong>:  ${msj.text} <img class="avatar" src="${msj.author.avatar}"></div>
                                </div>
                            </div>`;
                            
    })
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.innerHTML = `<h3>Centro de mensajes</h3>
                                <p> (Porcentaje de compresion: ${porcentaje}%) </p>
                                ${dataNueva.mensajes.length >0 ? mensajesElemento: ""}
                                ` 
});




