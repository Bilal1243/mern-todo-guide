import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTodoByIdQuery,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../slices/todoApiSlice";

function EditPage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const { data: todo, refetch } = useGetTodoByIdQuery({ id });

  const { data: todos, refetch: todosRefetch } = useGetTodosQuery();

  const [updateTodo] = useUpdateTodoMutation();

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      await updateTodo({
        title,
        description,
        status,
        id,
      }).unwrap();

      refetch();
      todosRefetch();

      setTitle("");
      setDescription("");
      setStatus(false);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setStatus(todo.status);
    }
  }, [todo]);

  return (
    <>
      <div>
        <form onSubmit={editHandler}>
          <input
            type="text"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows={5}
            cols={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="enter description"
          ></textarea>

          <select
            value={status.toString()}
            onChange={(e) => setStatus(e.target.value === "true")}
          >
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>

          <button type="submit">edit</button>
        </form>
      </div>
    </>
  );
}

export default EditPage;
