import asyncHandler from 'express-async-handler';
import generateToken from '../config/generateToken.js';
import User from '../models/UserModel.js'

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.status(201).json({
                success: true, user:
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    pic: user.pic,
                    token: generateToken(user._id),
                }
            })
        }
        else {
            res.status(400)
            throw new Error('Invalid Email or Password')
        }
    }
    catch (e) {
        res.json({
            //Since Error constructor return enumerable properties
            message: e.message,
            stack: e.stack,
        });
    }
})

const registorUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;
        if (!name || !email || !password) {
            res.status(400);
            throw new Error('Please Enter all fields')
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400)
            throw new Error('User already exists !!!')
        }

        const newUser = await User.create({ name, email, password, pic });

        if (newUser) {
            res.status(201).json({
                success: true, user:
                {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    pic: newUser.pic,
                    token: generateToken(newUser._id),
                }
            })
        }

    }
    catch (e) {
        res.json({
            //Since Error constructor return enumerable properties
            message: e.message,
            stack: e.stack,
        });
    }
})

export { loginUser, registorUser }