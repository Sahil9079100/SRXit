import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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
        collegeYear: {
            type: Number,
            required: true
        },
        roomNo: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        goOuttime: {
            type: String,
            require:true
        },
        gateKeeperPermission: {
            type: Boolean,
            default: false
        },
        randomQRtoken: {
            type: String
        },
        wardenname: {
            type: String,
            default: "noone"
        },
        destination: {
            type: String,
            default: "nowhere"
        },
        status: {
            type: String,
            default: "nothing"
        }
    },
    {
        timestamps: true
    }
);

export const Student = mongoose.model("Student", studentSchema);