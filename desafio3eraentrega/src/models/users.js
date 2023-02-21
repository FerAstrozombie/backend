import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    nombre:{
        type: String,
        require: true
    },
    direccion:{
        type: String,
        require: true
    },
    edad:{
        type: Number,
        require: true
    },
    telefono:{
        type: Number,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    carrito: {
        type: Array,
        require: true
    }
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const UserModel = mongoose.model(userCollection, userSchema);

export { UserModel }
