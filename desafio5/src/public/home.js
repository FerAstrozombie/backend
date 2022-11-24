console.log("js funcionando");
const socketClient = io();

const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const product = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        url: document.getElementById("url").value,
    }
    socketClient.emit("newProduct", product);
    productForm.reset();
})

const tableContainer = document.getElementById("tableContainer");
socketClient.on("products", async (data) => {
    const templateTable = await fetch("./partials/tabla.ejs")
    const templateFormat = await templateTable.text();

})