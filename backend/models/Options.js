import mongoose from "mongoose";

const optionsSchema = mongoose.Schema({
    optionInfo: {
        type: String,
        require: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const Options = mongoose.model('Options', optionsSchema)

export default Options;