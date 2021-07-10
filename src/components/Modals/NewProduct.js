import React, { useState, useEffect } from "react";
import "./Modal.css";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { formGetData } from "../../api/ApiRequests";

const NewProduct = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  const [richDescription, setRichDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [isFeatured, setIsFeatured] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [color, setColor] = useState("");
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState();
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [clicked, setClicked] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData("/categories");
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, []);

  function handleIconSubmit(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("category", categoryId);
    formData.append("description", description);
    formData.append("richDescription", richDescription);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("countInStock", countInStock);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("isFeatured", isFeatured);
    formData.append("discount", discount);
    setClicked(true);

    try {
      const data = await axios.post(
        "http://localhost:5000/api/v1/products",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      setError("");
      setResponse("Successfully Added.");
    } catch (error) {
      console.log(error.response);
      //   setError(error.response.data.msg);
      setClicked(false);
    }
  }

  return (
    <>
      <div className="modal">
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <div>
                <p className="attribute">Name</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                  <br />
                </Form.Group>
              </div>

              <div>
                <p className="attribute">Category</p>
                <select
                  className="form-control"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option selected disabled>
                    select
                  </option>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <option value={category._id}>{category.name}</option>
                    ))}
                </select>
                {/* <Form.Group>
                  <Form.Select>
                    <option selected disabled>
                      Select
                    </option>
                  </Form.Select>
                </Form.Group> */}
              </div>
              <div>
                <p className="attribute">Description</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="description"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Rich Description</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={richDescription}
                    onChange={(e) => setRichDescription(e.target.value)}
                    placeholder="rich description"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Color</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Color"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Brand</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="brand"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Price</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Count In Stock</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    placeholder="Count"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Rating</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Number of Reviews</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={numReviews}
                    onChange={(e) => setNumReviews(e.target.value)}
                    placeholder="Number of Reviews"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Is Featured?</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.value)}
                    placeholder="Featured"
                  />
                  <br />
                </Form.Group>
              </div>

              <div>
                <p className="attribute">Discount</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Discount"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Upload Image</p>
                <Form.Group>
                  <Form.File onChange={handleIconSubmit} />
                </Form.Group>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {!response ? (
                !clicked ? (
                  <Button variant="primary" className="my-3" type="submit">
                    Submit
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
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default NewProduct;
