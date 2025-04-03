import Todos from "../Model/todoModel.js";
import asyncHandler from '../middlewares/asyncHandler.js'

// get all todos
const getTodos = asyncHandler(async (req, res) => {

    let todos = await Todos.find()

    res.json(todos)

})


// create new todo
const createTodo = asyncHandler(async (req, res) => {
    let result = await Todos.create({
        title: req.body.title,
        description: req.body.description
    })

    res.json(result)
})


// delete todo
const deleteTodo = asyncHandler(async (req, res) => {
    await Todos.findByIdAndDelete(req.params.id)

    res.json({ message: 'deleted' })
})


// get one todo by id
const getTodoById = asyncHandler(async (req, res) => {
    const { id } = req.query

    let todo = await Todos.findOne({ _id: id })

    res.json(todo)
})


// update existing todo
const updateTodo = asyncHandler(async (req, res) => {

    let { title, description, status, id } = req.body

    let updatedTodo = await Todos.findByIdAndUpdate(id, { title, description, status })

    res.json(updatedTodo)
})


export {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    getTodoById
}