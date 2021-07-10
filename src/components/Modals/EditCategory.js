import React, { useState, useEffect } from "react";
import "./Modal.css";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import { formGetData } from "../../api/ApiRequests";
import axios from "axios";

const EditCategory = (props) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState();
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { payload },
        } = await formGetData(`/categories/${props.id}`);
        // console.log(payload);
        setName(payload.name);
        setColor(payload.color);
      } catch (error) {
        console.log(error.response);
      }
    }
    fetchData();
  }, [props.id]);

  function handleIconSubmit(e) {
    setIcon(e.target.files[0]);
  }

  async function handleCategoryChange(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("icon", icon);
    formData.append("name", name);
    formData.append("color", color);
    setClicked(true);

    try {
      const data = await axios.put(
        `http://localhost:5000/api/v1/categories/${props.id}`,
        { ...formData },
        {
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": `multipart/form-data`,
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
            <Form onSubmit={handleCategoryChange}>
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
                <p className="attribute">Color</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#fafafa"
                  />
                  <br />
                </Form.Group>
              </div>
              <div>
                <p className="attribute">Upload Icon</p>
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

export default EditCategory;
