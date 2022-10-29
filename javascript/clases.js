class Usuario {
    constructor(nombre, apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros = [];
        this.mascotas = mascotas = [];
    };
    getFullName(){
        return `El nombre completo del usuario es ${this.nombre} ${this.apellido}`;
    };
    addMascota(mascotas){
        return this.mascotas.push(mascotas);
    };
    countMascotas(){
        return  `El usuario ${this.nombre} tiene ${this.mascotas.length} mascotas`
    };
    addBook(nombre, autor){
        return this.libros.push({nombre,autor})
    }
    getBookNames(){
        return this.libros.map(function(element){
            return element.nombre;
        })
    }
}

const fer = new Usuario ("Fer", "Lair",);
console.log(fer.getFullName());
fer.addMascota("perro");
fer.addMascota("gato");
console.log(fer.mascotas);
console.log(fer.countMascotas());
fer.addBook("El señor de los anillos", "J. R. tolkien");
fer.addBook("Harry Potter", "J. K. Rowling")
console.log(fer.libros);
console.log(fer.getBookNames());



