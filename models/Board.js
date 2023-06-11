import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    Email: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
});

const BoardDB = mongoose.model('BoardDB', DBSchema);
module.exports = BoardDB;
