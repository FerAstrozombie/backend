import { ObjectId } from "../../depts.ts";

export interface User{
    _id: ObjectId;
    name: string;
    email: string;
}

export interface Producto{
    _id: ObjectId;
    title: string;
    description: string;
    price: number;    
}