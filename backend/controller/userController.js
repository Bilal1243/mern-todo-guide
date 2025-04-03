import Users from '../Model/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import bcrypt from 'bcrypt'


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
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else {
        res.status(400).json({ message: 'invalid user data' })
    }

})


// login user
const loginUser = asyncHandler(async (req, res) => {
    let { email, password } = req.body

    const user = await Users.findOne({ email: email })


    if (user && await user.matchPassword(password)) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else {
        res.status(400).json({ message: 'invalid user data' })
    }

})




export {
    registerUser,
    loginUser
}