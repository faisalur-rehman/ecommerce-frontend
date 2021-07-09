import React from "react";
import { Button, Form } from "react-bootstrap";
// import "./Login.css";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div>
      <Form className="login-form">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Name"
          />
          <label>Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Phone"
          />
          <label>Phone</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Street"
          />
          <label>Street</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Apartment"
          />
          <label>Apartment</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Zip"
          />
          <label>Zip</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Name"
          />
          <label>City</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Name"
          />
          <label>Country</label>
        </div>
        <Button variant="primary" className="my-3">
          Register
        </Button>
      </Form>
      <p className="text-center forgot-password">Forgot Password?</p>
      <Link to="/login">
        <p className="register-here">Already have an account? Login here</p>
      </Link>
    </div>
  );
};

export default Register;
