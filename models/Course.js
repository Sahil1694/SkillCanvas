import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
    // Title type, required, minLength, maxLength
    title:{
        type:String,
        required: [true , "Please enter course title"],
        minLength: [4 , "Title must be at least 4 characters"],
        maxLength: [80 , "Title can't exceed 80 characters"],   
    },
    // Description type, required, minLength
    description:{
        type:String,
        required: [true , "Please enter course description"],
        minLength: [20 , "description must be at least 20 characters"],
    },
    // Lectures title,description,videos { public_id,url }
    lectures:[
        {   
            title:{
                type:String,
                required:true,
            },
            description:{
                type:String,
                required:true,
            },
            vedio:{
                public_id:{
                    type: String,
                    required: true,
                },
                url:{
                    type: String,
                    required: true,
                },
            },
        }
    ],
    // Poster public_id, url
    poster:{
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    // Views type, default
    views:{
        type:Number,
        default:0,
    },
    // NumOfVideos type, default
    numofVideos:{
        type:Number,
        default:0,
    },
    // Category type, required
    category:{
        type:String,
        required:true,
    },
    // CreatedBy type, required
    createdBy:{
        type:String,
        required:[true, "Enter Course Creater Name"],
    },
    // CreatedAt type, default
    createdAt:{
        type:Date,
        default: Date.now,
    },
})

export const Course = mongoose.model("Course",schema)

