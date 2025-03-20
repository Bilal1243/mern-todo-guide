import Todos from "../Model/todoModel.js";


const getTodos = async (req, res) => {
    try {

        let todos = await Todos.find()

        res.json(todos)

    } catch (error) {
        console.log(error)
    }

}


const createTodo = async (req, res) => {
    try {

        let result = await Todos.create({
            title: req.body.title,
            description: req.body.description
        })

        res.json(result)

    } catch (error) {
        console.log(error)
    }
}


const deleteTodo = async (req, res) => {
    try {

        console.log(req.params)

        await Todos.findByIdAndDelete(req.params.id)

        res.json({ message: 'deleted' })

    } catch (error) {
        console.log(error)
    }
}



const getTodoById = async (req, res) => {
    try {

        const { id } = req.query

        let todo = await Todos.findOne({ _id: id })

        res.json(todo)

    } catch (error) {
        console.log(error)
    }
}



const updateTodo = async (req, res) => {
    try {

        let { title, description, status, id } = req.body

        let updatedTodo = await Todos.findByIdAndUpdate(id, { title, description, status })

        res.json(updatedTodo)

    } catch (error) {
        console.log(error)
    }
}


export {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    getTodoById
}