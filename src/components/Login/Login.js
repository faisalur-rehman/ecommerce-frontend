import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { Link } from "react-router-dom";
import { postData } from "../../api/ApiRequests";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      const { data } = await postData("/users/login", { email, password });
      console.log(data);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div>
      <Form className="login-form" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            value={email}
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
          />
          <label>Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            value={password}
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <label>Password</label>
        </div>

        <Button variant="primary" className="my-3" type="submit">
          Login
        </Button>
      </Form>
      <p className="text-center forgot-password">Forgot Password?</p>
      <Link to="/register">
        <p className="register-here">Dont have an account?Register here</p>
      </Link>
    </div>
  );
};

export default Login;
