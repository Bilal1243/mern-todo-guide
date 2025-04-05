import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    }
})


const Todos = mongoose.model('todos', todoSchema)


export default Todos