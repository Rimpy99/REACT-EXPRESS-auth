import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {   
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const User = model("User", userSchema);

export default User;