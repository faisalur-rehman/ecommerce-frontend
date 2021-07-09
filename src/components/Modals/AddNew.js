import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./Modal.css";
import { Form, Button } from "react-bootstrap";

const AddNew = (props) => {
  const [name, setName] = useState(props.name);
  const [multiSelect, setMultiSelect] = useState(false);

  function handleMultiSelectModal() {
    setMultiSelect(true);
    props.onHide();
  }

  console.log(multiSelect);
  return (
    <>
      <div className="modal">
        <Modal
          {...props}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div>
              <p className="attribute">Name</p>

              <Form.Group>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
              </Form.Group>
            </div>
            <div>
              <p className="attribute">Hidden</p>
              <Form.Check
                inline
                type="radio"
                label="false"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                inline
                type="radio"
                label="true"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </div>
            <div>
              <p className="attribute">Must See</p>
              <Form.Check
                inline
                type="radio"
                label="false"
                name="must"
                id="must1"
              />
              <Form.Check
                inline
                type="radio"
                label="true"
                name="must"
                id="must2"
              />
            </div>
            <div className="text-center">
              <Button className="mt-3">Get Location from Map</Button>
            </div>
            <div className="text-center location">
              <div>
                <p className="attribute">Latitude</p>
                <p>123456</p>
              </div>
              <div>
                <p className="attribute">Longitude</p>
                <p>123456</p>
              </div>
            </div>
            <div className="image">
              <img
                src={props.img}
                alt=""
                className="text-center rounded"
                width={150}
                height={150}
              />
            </div>
            <div className="text-center">
              <div>
                <Button style={{ minWidth: "140px" }} className="m-3">
                  Change Image
                </Button>
              </div>
              <div>
                <Button style={{ minWidth: "140px" }}>Change Icon </Button>
              </div>
              <div onClick={handleMultiSelectModal}>
                <Button style={{ minWidth: "140px" }} className="mt-3">
                  Group{" "}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AddNew;
