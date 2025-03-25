import { useState, useEffect } from "react";
import "./HomePage.css";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} from "../slices/todoApiSlice";
import { useNavigate } from "react-router-dom";

function HomePage() {
  // let [variable,setVariable] = useState(initialValue)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data: todos, refetch } = useGetTodosQuery();

  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const navigate = useNavigate();

  const createTodoHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await createTodo({ title, description });
      refetch();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      await deleteTodo(id).unwrap();

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={createTodoHandler}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          <textarea
            rows={5}
            cols={10}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>

          <button type="submit">add</button>
        </form>
      </div>

      <div>
        {todos?.map((todo, index) => (
          <div className="box">
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <button onClick={() => deleteTodoHandler(todo._id)}>delete</button>
            {!todo.status && (
              <button onClick={() => navigate(`/edit/${todo._id}`)}>
                edit
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
