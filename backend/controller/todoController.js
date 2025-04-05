import Todos from "../Model/todoModel.js"
import asyncHandler from '../middlewares/asyncHandler.js'

// Get all todos
const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todos.find({ userId: req.query.userId })
    return res.json(todos)
})

// Create new todo
const createTodo = asyncHandler(async (req, res) => {
    const result = await Todos.create({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId
    })

    return res.status(201).json(result)
})

// Delete todo
const deleteTodo = asyncHandler(async (req, res) => {
    const deleted = await Todos.findByIdAndDelete(req.params.id)

    if (!deleted) {
        return res.status(404).json({ message: 'Todo not found' })
    }

    return res.json({ message: 'Deleted' })
})

// Get one todo by ID
const getTodoById = asyncHandler(async (req, res) => {
    const { id } = req.query
    const todo = await Todos.findById(id)

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' })
    }

    return res.json(todo)
})

// Update existing todo
const updateTodo = asyncHandler(async (req, res) => {
    const { title, description, status, id } = req.body

    const updatedTodo = await Todos.findByIdAndUpdate(
        id,
        { title, description, status },
        { new: true } // Return updated document
    )

    if (!updatedTodo) {
        return res.status(404).json({ message: 'Todo not found' })
    }

    return res.json(updatedTodo)
})

export {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    getTodoById
}
