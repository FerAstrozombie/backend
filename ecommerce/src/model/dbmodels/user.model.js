import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userCollection = "users";

const userSchema = new mongoose.Schema(
    {
        nombre:{
            type:String,
            required:true
        },
        apellido:{
            type:String,
            required:true
        },
        dni:{
            type: Number,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        avatar: {
            type: String,
            require: true
        },
        carrito: {
            type: Array,
            require: true
        },
        ordenes: {
            type: Array
        }
    },
    {
        timestamps:true
    }
);

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export const UserModel = mongoose.model(userCollection,userSchema);