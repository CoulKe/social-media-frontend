import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EditOrDeleteNav, WideEditOrDelete } from "./style";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { deletePost } from "../../actions/postActions";

export default function EditOrDeletePost({ onCancel, post }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);};
  const handleShow = () => {setShow(true); };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deletePost(post._id))
    setShow(false);
  };

  return (
    <div>
    <WideEditOrDelete onClick={e => {e.stopPropagation(); onCancel(false)}}></WideEditOrDelete>
      <div className="position-relative">
      <EditOrDeleteNav className="border d-flex flex-column shadow-lg bg-white">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Proceed to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Form method="POST" onSubmit={handleSubmit}>
          <Button variant="primary" type="submit">
            Delete
          </Button>
          </Form>
        </Modal.Footer>
      </Modal>
      <Link to={`/edit-post?postId=${post._id}`} className="border-bottom bg-white" >
        Edit
      </Link>


      <button
        type="submit"
        className="bg-white"
        onClick={(e) => {
          e.stopPropagation();
          handleShow(() => true);
        }}
      >
        Delete
      </button>
    </EditOrDeleteNav>

    </div>
    </div>
  );
}
