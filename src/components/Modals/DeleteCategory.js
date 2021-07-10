import React, { useState } from "react";
import "./Modal.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { deleteItem } from "../../api/ApiRequests";

const DeleteCategory = (props) => {
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState("");

  async function deleteCategory() {
    setClicked(true);
    try {
      const data = await deleteItem(`/${props.endpoint}/${props.id}`);
      console.log(data);
      setError("");
    } catch (error) {
      console.log(error.response);
      // setError(error.response.data.msg);
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
            <p>Are you sure you want to delete this?</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!clicked ? (
              <>
                <Button
                  variant="danger"
                  className="my-3"
                  onClick={deleteCategory}
                >
                  Delete
                </Button>
                <Button
                  variant="secondary"
                  className="m-3"
                  onClick={() => props.onHide()}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="danger" disabled className="my-3">
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
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default DeleteCategory;
