import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CommentControlsNav, CommentControlsOverlay } from "./style";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { deleteComment } from "../../actions/commentActions";

export default function CommentControls({ onCancel, comment, postId }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteComment(comment._id));
    setShow(false);
    onCancel(false);
  };

  return (
    <div>
      <CommentControlsOverlay
        onClick={(e) => {
          e.stopPropagation();
          onCancel(false);
        }}
      ></CommentControlsOverlay>
      <div className="position-relative">
        <CommentControlsNav className="border d-flex flex-column shadow-lg bg-white">
          <Modal
            show={show}
            onClick={() => onCancel(false)}
            onHide={() => {
              setShow(false);
              onCancel(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Proceed to delete?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary">Cancel</Button>
              <Form method="POST" onClick={handleSubmit}>
                <Button variant="primary" type="submit">
                  Delete
                </Button>
              </Form>
            </Modal.Footer>
          </Modal>
          <Link
            to={`/edit-comment?commentId=${comment._id}&postId=${postId}`}
            className="border-bottom bg-white"
          >
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
        </CommentControlsNav>
      </div>
    </div>
  );
}
