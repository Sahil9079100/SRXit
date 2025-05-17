import mongoose from "mongoose";

const wardernSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNo: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Wardern = mongoose.model("Wardern", wardernSchema);