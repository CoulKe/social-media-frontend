import React, { useEffect, useRef, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { PostControlsNav, PostControlsOverlay, HiddenInput } from "./style";
import { Link } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { deletePost, togglePinPost,pinningPostReset } from "../../actions/postActions";

export default function PostControls({ onCancel, post }) {
  const dispatch = useDispatch();
  const {pinning, pinningSuccess} = useSelector(state => state.posts)

  const authenticatedUser = localStorage.getItem("loggedUser");

  const [show, setShow] = useState(false);
  const copyLink = useRef(null);

  useEffect(()=>{
    if(pinningSuccess){
      dispatch(pinningPostReset());
      onCancel(false);
    }
  },[dispatch, onCancel, pinningSuccess])

  const handleClose = () => {
    onCancel(false);
    setShow(false);
  };
  const handleShow = () => {setShow(true); };
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deletePost(post._id))
    setShow(false);
  };

  return (
    <div>
    <PostControlsOverlay  onClick={e => {e.stopPropagation(); onCancel(false)}}></PostControlsOverlay> 
      <div className="position-relative">
      <PostControlsNav className="border d-flex flex-column shadow-lg bg-white">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Proceed to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Form method="POST" onSubmit={handleDelete}>
          <Button variant="primary" type="submit">
            Delete
          </Button>
          </Form>
        </Modal.Footer>
      </Modal>
      {authenticatedUser === post.user.username &&
       (
        <div>
        <Link to={`/edit-post?postId=${post._id}`} className="border-bottom bg-white" >
        Edit
      </Link>

      {/* If pinning is successfull, useEffect will handle the overlay closing */}
      <Form method="POST" className="border-bottom" onSubmit={(e) => {
          dispatch(togglePinPost(post._id));
          e.stopPropagation();
          e.preventDefault();
        }}>
      <button
        type="submit"
        className="bg-white"
      >
        {!pinning && post.isPinned ? 'Unpin post' : !pinning && !post.isPinned ? 'Pin post' : 'Pinning'}
      </button>
      </Form>
      <Form method="POST" className="border-bottom" onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleShow();
        }}>
      <button
        type="submit"
        className="bg-white"
      >
        Delete
      </button>
      </Form>
      </div>
      )}
      <Form onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyLink.current.select();
        if(typeof document.execCommand === "function"){
         document.execCommand('copy');
         return onCancel(false);
        }
        else if(navigator.clipboard){
          console.log('Passed here');
        }
      }}>
      {/* Don't put hidden attribute to allow copying */}
      <HiddenInput type="text" ref={copyLink} readOnly value={`${window.location.host}/comments?postId=${post._id}`}/>
      <button className="bg-white" role="link">Copy link</button>
      </Form>
    </PostControlsNav>

    </div>
    </div>
  );
}
