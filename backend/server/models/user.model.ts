import { Document, Schema, model } from 'mongoose';

interface User {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    mobilePhone: string;
    email: string;
    password?: string;
}


export interface UserModelInterface extends User, Document {
    fullName(): string;
}

const UserSchema: Schema<UserModelInterface> = new Schema<UserModelInterface>(
    {
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        state: String,
        phone: String,
        mobilePhone: String,
        email: String,
        password: String
    }
);

UserSchema.methods.fullName = function () {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

export default model<UserModelInterface>('User', UserSchema);