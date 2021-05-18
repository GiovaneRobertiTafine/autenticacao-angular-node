import { Document, Schema, model } from 'mongoose';

interface Person extends Document {
    name: string;
    country: string;
    email: string;
    company: string;
}

const UserSchema: Schema<Person> = new Schema<Person>(
    {
        name: String,
        country: String,
        email: String,
        company: String,
    }
);


export default model<Person>('Person', UserSchema);