import express from 'express'
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from '../controller/todoController.js'

const todoRoute = express.Router()


todoRoute.get('/getTodos', getTodos)

todoRoute.post('/createTodo', createTodo)

todoRoute.get('/getTodoById', getTodoById)

todoRoute.patch('/updateTodo', updateTodo)

todoRoute.delete('/:id', deleteTodo)


export default todoRoute