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
    imageurl:{
        type: String,
        required: true
    },
    audiourl : {
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


export const Songs = mongoose.model("Song", songsSchema);