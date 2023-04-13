console.log("Js funcionando");

const socketClient = io();

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (event) =>{
    let today = new Date();
    let now = today.toLocaleString();
    let usuario = "usuario";
    const user = document.getElementById("chatForm").firstChild.nextElementSibling.innerHTML;
    event.preventDefault();
    const mensaje = {
        autor: user,
        tipo: usuario,
        mensaje: document.getElementById("mensajeChat").value,
        hora: now
    };
        socketClient.emit("nuevoMensaje", mensaje)
        chatForm.reset();
    
});

const chatContainer = document.getElementById("chatContainer");
socketClient.on("mensajesChat", async (dataEnviada) => {
    let mensajesElemento = "";
    dataEnviada.map(function(msj){
        mensajesElemento += `
                            <div class="contenedor">
                                <div class="chat">
                                    <p class="chatBurbuja"><strong>${msj.autor}</strong>:  ${msj.mensaje}</p>
                                </div>
                            </div>`;
    })
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.innerHTML = `${dataEnviada.length >0 ? mensajesElemento: ""}
                                ` 
});