import asyncHandler from 'express-async-handler'
import Options from '../models/Options.js';
import Question from '../models/QuestionModel.js';

const getAllQuestions = asyncHandler(async (req, res) => {
    try {
        const allQuestions = await Question.find({})
            // .populate({ path: 'options' })
        .populate({ path: 'questioner options', select: '-password' });
        res.status(201).json({
            success: true,
            questions: allQuestions
        });
    }
    catch (e) {
        res.json({
            //Since error constructor return enumerable properties
            message: e.message,
            stack: e.stack,
        });
    }
})

const createQuestion = asyncHandler(async (req, res) => {
    try {
        const { question, category, options, optionsCheckBox, description } = req.body;
        if (!question || !category || !options || !optionsCheckBox || !description) {
            res.status(400);
            throw new Error('Please Enter all fields')
        }
        let optionsArr = []
        await Promise.all(options.map(async (op, i) => {
            const newOps = await Options.create({ optionInfo: op, isCorrect: optionsCheckBox[i] })
            optionsArr.push(newOps._id)
        }));
        let newQuestion = await Question.create({ questioner: req.user._id, question, category, options: optionsArr, description });
        newQuestion = await newQuestion.populate({ path: 'questioner options', select: '-password' });
        res.status(201).json({
            success: true,
            question: newQuestion
        })
    }
    catch (e) {
        res.json({
            //Since error constructor return enumerable properties
            message: e.message,
            stack: e.stack,
        });
    }
})

export { getAllQuestions, createQuestion }