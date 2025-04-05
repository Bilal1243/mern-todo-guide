import express from 'express'
import { loginUser, logoutUser, registerUser } from '../controller/userController.js'

const userRoute = express.Router()

// login user
userRoute.post('/', loginUser)

// register user
userRoute.post('/register', registerUser)
 
// logout user
userRoute.get('/logout', logoutUser)



export default userRoute