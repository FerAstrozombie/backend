class ProductDto{
    constructor({_id, nombre, precio, stock}){
        this.id = _id,
        this.nombre = nombre,
        this.precio = precio,
        this.stock = stock
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