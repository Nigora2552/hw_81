import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    shortUrl: String,
    originalUrl: {
        type: String,
        required: [true, 'URL is required']
    },
})

const Link = mongoose.model('Link', LinkSchema);
export default Link;