import express from 'express'
import connectDb from './config/db.js'
import todoRoute from './Routes/todoRoutes.js'
import cors from 'cors'

const app = express()

let port = 3000

connectDb()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(cors())

// app.httpmethod(route,routeHandler)


app.use('/api/todos', todoRoute)


app.listen(port, () => {
    console.log(`server started successfully on port : ${port}`)
})

// f9CYJfkfFRUip6Pn