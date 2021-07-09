import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { postData } from "../../api/ApiRequests";
const Register = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(0);
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setClicked(true);
    try {
      const { data } = await postData("/users/register", {
        name,
        email,
        password,
        country,
        city,
        zip,
        phone,
        street,
        apartment,
        isAdmin: false,
      });
      console.log(data);
      setError("");
      history.push("/login");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.msg);
      setClicked(false);
    }
  }

  return (
    <div>
      <Form className="login-form" onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            required
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Name"
            value={name}
            onChange={({ target }) => setName(target.value)}
            required
          />
          <label>Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Phone"
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
            required
          />
          <label>Phone</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Street"
            value={street}
            onChange={({ target }) => setStreet(target.value)}
            required
          />
          <label>Street</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Apartment"
            value={apartment}
            onChange={({ target }) => setApartment(target.value)}
            required
          />
          <label>Apartment</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Zip"
            value={zip}
            onChange={({ target }) => setZip(target.value)}
            required
          />
          <label>Zip</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="City"
            value={city}
            onChange={({ target }) => setCity(target.value)}
            required
          />
          <label>City</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingPassword"
            placeholder="Country"
            value={country}
            onChange={({ target }) => setCountry(target.value)}
            required
          />
          <label>Country</label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!clicked ? (
          <Button variant="primary" className="my-3" type="submit">
            Register
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
      <Link to="/login">
        <p className="register-here">Already have an account? Login here</p>
      </Link>
    </div>
  );
};

export default Register;
