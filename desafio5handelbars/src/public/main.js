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

let autor = "";
Swal.fire({
    title:"Bienvenido",
    text:"Infresa tu email",
    input:"email",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
}).then(response =>{
    autor = response.value;
})

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (event) =>{
    let today = new Date();
    let now = today.toLocaleString();
    event.preventDefault();
    const mensaje = {
        autor: autor,
        mensaje: document.getElementById("mensajeChat").value,
        hora: now
    };
    socketClient.emit("nuevoMensaje", mensaje)
    chatForm.reset();
})

const chatContainer = document.getElementById("chatContainer");
socketClient.on("mensajesChat", async (data) => {
    const templateChat = await fetch("./templates/chat.handlebars")
    const templateFormatChat = await templateChat.text();
    const template = Handlebars.compile(templateFormatChat);
    const html = template({mensajesChat:data})    
    chatContainer.innerHTML = html;
})




