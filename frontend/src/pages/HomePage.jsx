import { useEffect, useState } from "react";
import "./HomePage.css";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} from "../slices/todoApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useUserLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

function HomePage() {
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { data: todos, refetch } = useGetTodosQuery({ userId: userData?._id });
  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [userLogout] = useUserLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createTodoHandler = async (e) => {
    e.preventDefault();
    try {
      await createTodo({ title, description, userId: userData._id }).unwrap();
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


  const logoutHandler = async () => {
    try {
      await userLogout().unwrap();

      await dispatch(logout());

      toast.success("logout success");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="delete-btn" onClick={() => logoutHandler()}>
        Logout
      </button>

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
    </>
  );
}

export default HomePage;
