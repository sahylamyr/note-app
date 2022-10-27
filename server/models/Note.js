import { model, Schema } from "mongoose";
const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    }
})


const Note = model('Note', noteSchema)

export default Note