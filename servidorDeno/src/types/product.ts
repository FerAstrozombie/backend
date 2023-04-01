import { ObjectId } from "../../depts.ts";

export interface Product{
    _id: ObjectId;
    title: string;
    description: string;
    price: number;    
}