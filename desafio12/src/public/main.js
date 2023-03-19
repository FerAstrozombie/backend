console.log("Js funcionando");

const socketClient = io();

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const product = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        url: document.getElementById("url").value,
        precio: document.getElementById("precio").value,
        stock: document.getElementById("stock").value
    }
    socketClient.emit("newProduct", product);
    productForm.reset();
});

const productsContainer = document.getElementById("productsContainer");
socketClient.on("products", async(data)=>{
    const templateTable = await fetch("./templates/table.hbs");
    const templateFormat = await templateTable.text();
    const template = Handlebars.compile(templateFormat);
    const html = template({products:data});
    productsContainer.innerHTML = html;
});

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (event) =>{
    let today = new Date();
    let now = today.toLocaleString();
    event.preventDefault();
    const mensaje = {
        autor: document.getElementById("autor").value,
        mensaje: document.getElementById("mensajeChat").value,
        hora: now
    };
        socketClient.emit("nuevoMensaje", mensaje)
        chatForm.reset();
    
});

const chatContainer = document.getElementById("chatContainer");
socketClient.on("mensajesChat", async (data) => {
    let mensajesElemento = "";
    data.forEach(msj=>{
        mensajesElemento += `
                            <div class="contenedor">
                                <div class="chat">
                                    <div class="chatBurbuja"><strong>${msj.autor} - ${msj.hora}</strong>:  ${msj.mensaje}</div>
                                </div>
                            </div>`;
    })
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.innerHTML = `${data.length >0 ? mensajesElemento: ""}
                                ` 
});