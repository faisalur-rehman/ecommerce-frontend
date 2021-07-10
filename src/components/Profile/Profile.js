import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { checkDetails, formGetData } from "../../api/ApiRequests";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { payload },
        } = await formGetData(
          `/users/${localStorage.getItem("userId")}`,
          localStorage.getItem("token")
        );
        console.log("profile", payload);
        setName(payload.name);
        setStreet(payload.street);
        setEmail(payload.email);
        setPhone(payload.phone);
        setApartment(payload.apartment);
        setZip(payload.zip);
        setCountry(payload.country);
        setCity(payload.city);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setClicked(true);
    try {
      const { data } = await checkDetails(
        `/users/${localStorage.getItem("userId")}`,
        {
          name,
          email,

          country,
          city,
          zip,
          phone,
          street,
          apartment,
          isAdmin: false,
        }
      );
      console.log(data);
      setResponse("Profile Updated Successfully");
      setError("");
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
          <label>Email address</label>
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
        {!response ? (
          !clicked ? (
            <Button variant="primary" className="my-3" type="submit">
              Update
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
          )
        ) : (
          <p>{response}</p>
        )}
      </Form>
    </div>
  );
};

export default Profile;
