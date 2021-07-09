import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { postData } from "../../api/ApiRequests";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setClicked(true);
    console.log(email, password);
    try {
      const { data } = await postData("/users/login", { email, password });
      console.log(data);

      localStorage.setItem("token", data.token);
      setError("");
      history.push("/dashboard");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.msg);
      setClicked(false);
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!clicked ? (
          <Button variant="primary" className="my-3" type="submit">
            Login
          </Button>
        ) : (
          <Button variant="primary" disabled className="my-3">
            <Spinner
              as="span"
              animation="grow"
              role="status"
              aria-hidden="true"
              size="sm"
            />
            Loading...
          </Button>
        )}
      </Form>
      <p className="text-center forgot-password">Forgot Password?</p>
      <Link to="/register">
        <p className="register-here">Dont have an account?Register here</p>
      </Link>
    </div>
  );
};

export default Login;
