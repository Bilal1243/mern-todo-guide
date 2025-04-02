import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { toast } from "react-toastify";
import { useUserRegisterMutation } from "../slices/userApiSlice";

function RegisterPage() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const [userRegister] = useUserRegisterMutation();

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      let responseData = await userRegister({ name, email, password }).unwrap();
      toast.success("Registered");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={registerHandler}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
