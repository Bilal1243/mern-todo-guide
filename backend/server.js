import express from 'express'
import connectDb from './config/db.js'
import todoRoute from './Routes/todoRoutes.js'
import userRoute from './Routes/userRoutes.js'
import cors from 'cors'

const app = express()

let port = 3000

connectDb()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())


app.use('/api/todos', todoRoute)
app.use('/api/users', userRoute)


app.listen(port, () => {
    console.log(`server started successfully on port : ${port}`)
})