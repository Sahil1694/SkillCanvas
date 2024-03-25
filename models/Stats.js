import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({

    users: {
        type: Number,
        default: 0
    },
    subscription: {
        type: Number,
        default: 0
    },

    views: {
        type: Number,
        default: 0
    },
    
    // CreatedAt type, default
    createdAt:{
        type:Date,
        default: Date.now,
    },
})

export const Stats = mongoose.model("Stats",schema)


