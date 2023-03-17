class ProductDto{
    constructor({_id,nombre, precio, stock, url}){
        this.nombre = nombre,
        this.precio = precio,
        this.stock = stock,
        this.url = url,
        this.id = _id
    }
}

export const convertProductToDto = (products) => {
    if(Array.isArray(products)){
        return products.map(product => new ProductDto(product));
    } else {
        return new ProductDto(products);
    }
}
export { ProductDto }