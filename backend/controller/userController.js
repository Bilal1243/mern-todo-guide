import Users from '../Model/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// create a new user
const registerUser = asyncHandler(async (req, res) => {
    let { name, email, password } = req.body


    const salt = await bcrypt.genSalt(10)
    const encrycptedPassword = await bcrypt.hash(password, salt)


    const userExists = await Users.findOne({ email: email })

    if (userExists) {
        return res.status(400).json({ message: 'user already exists' })
    }

    const user = await Users.create({
        name,
        email,
        password: encrycptedPassword
    })


    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else {
        return res.status(400).json({ message: 'invalid user data' })
    }

})


// login user
const loginUser = asyncHandler(async (req, res) => {
    let { email, password } = req.body

    const user = await Users.findOne({ email: email })


    if (user && await user.matchPassword(password)) {

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else {
        return res.status(400).json({ message: 'invalid user data' })
    }

})


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: 'logged out successfully' })
})



export {
    registerUser,
    loginUser,
    logoutUser
} 