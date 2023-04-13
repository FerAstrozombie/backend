import mongoose from "mongoose";

const chatCollection = "chats";

const chatSchema = new mongoose.Schema(
    {
        autor:{
            type:String,
            required:true,
        },
        tipo:{
            type:String,
        },
        mensaje: {
            type: String,
        },
        hora: {
            type: String,
        }
    }
);

export const ChatModel = mongoose.model(chatCollection,chatSchema);