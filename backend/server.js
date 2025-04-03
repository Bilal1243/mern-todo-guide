import express from 'express'
import connectDb from './config/db.js'
import todoRoute from './Routes/todoRoutes.js'
import userRoute from './Routes/userRoutes.js'
import cors from 'cors'
import { errorHandler, notFound } from './middlewares/errorMiddlewares.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

let port = process.env.PORT

connectDb()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())


app.use('/api/todos', todoRoute)
app.use('/api/users', userRoute)


app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`server started successfully on port : ${port}`)
})