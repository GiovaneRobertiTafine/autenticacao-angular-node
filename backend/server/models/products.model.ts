import { Document, Schema, model } from 'mongoose';

interface Product extends Document {
    name: string;
    deparment: string;
    price: string;
}

const UserSchema: Schema<Product> = new Schema<Product>(
    {
        name: String,
        deparment: String,
        price: String,
    }
);

export default model<Product>('Product', UserSchema);