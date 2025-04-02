import { useState } from "react";
import "./HomePage.css";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} from "../slices/todoApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function HomePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data: todos, refetch } = useGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const navigate = useNavigate();

  const createTodoHandler = async (e) => {
    e.preventDefault();
    try {
      await createTodo({ title, description });
      refetch();
      setTitle("");
      setDescription("");
      toast.success("Todo added");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      await deleteTodo(id).unwrap();
      refetch();
      toast.success("Todo Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={createTodoHandler}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter Title"
          />

          <textarea
            rows={5}
            cols={10}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Enter Description"
          ></textarea>

          <button type="submit">Add</button>
        </form>
      </div>

      <div className="todos-container">
        {todos?.map((todo) => (
          <div className="box todo-card" key={todo._id}>
            <h1 className={todo.status ? "completed" : "todo-title"}>
              {todo.title}
            </h1>
            <p className="todo-description">{todo.description}</p>
            <div className="button-group">
              <button
                className="delete-btn"
                onClick={() => deleteTodoHandler(todo._id)}
              >
                Delete
              </button>
              {!todo.status && (
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit/${todo._id}`)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
