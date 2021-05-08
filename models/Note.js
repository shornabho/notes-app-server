import mongoose from "mongoose";

const Note = mongoose.model('Note', mongoose.Schema({
    title: String,
    body: String,
    attachments: {
        type: [String],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    pinned: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    lastModifiedAt: {
        type: Date,
        default: new Date()
    }
}));

export default Note;