import mongoose from "mongoose";
import { nanoid } from "nanoid";

const urlsSchema = new mongoose.Schema({
    fullUrl:{
        type : String,
        required : true,
    },
    shortUrl:{
        type: String,
        required : true,
        default : nanoid(8)
    }
});

export default mongoose.model('urls',urlsSchema);
