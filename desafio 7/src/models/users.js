const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userCollection = "users";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password:{
        type: String,
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

module.exports = UserModel;