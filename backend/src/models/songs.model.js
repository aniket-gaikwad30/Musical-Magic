import mongoose from "mongoose";


const songsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    audioUrl : {
        type: String,
        required: true
    },
    duration: {
        type : Number
    },
    albumID :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Album",
        required :false 
    }

},{timestamps: true})


export const Songs = mongoose.model("Songs", songsSchema);