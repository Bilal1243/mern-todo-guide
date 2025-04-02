import express from 'express'
import { loginUser, registerUser } from '../controller/userController.js'

const userRoute = express.Router()

// login user
userRoute.post('/', loginUser)

// register user
userRoute.post('/register', registerUser)



export default userRoute