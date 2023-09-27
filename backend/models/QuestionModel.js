import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    questioner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Options'
    }],
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Question = mongoose.model('Question', questionSchema)

export default Question;