import moo, { Schema } from "mongoose";

const historySchema = new moo.Schema ({

    name:{
        type: String,
        required: true
    },

    phoneNo:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true
    },

    collegeYear:{
        type: String,
        required: true
    },

    destination:{
        type:String,
        required: true
    },

    wardernname:{
        type:String,
        required: true
    },

    goouttime:{
        type:String,
        required: true
    },

    comeintime:{
        type:String,
        required: true
    }
});


export const History = moo.model("History" , historySchema);

/*
name
phonenumber
your email
collegeyear
destination
wardern name
go out time
come in time
*/