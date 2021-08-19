import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { storePost } from "../../actions/postActions";

export default function PostBox({sending=false, sendingSuccess=false}) {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    if(sendingSuccess){
      formRef.current.reset();
      setNewPost("")
    } 
  }, [sendingSuccess]);

  return (
    <Form
    ref={formRef}
      style={{ padding: "8px" }}
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        if (newPost.length <= 500 && newPost.length > 0) {
          dispatch(storePost(newPost));
        } else if (newPost.length < 1) {
          alert("Post can't be empty");
        } else {
          alert("Post is more than 500 characters");
        }
      }}
    >
      <Form.Group>
        {newPost.length > 500 && (
          <span className="font-weight-bold text-danger">
            Post shouldn't be more than 500 characters!
          </span>
        )}
        {newPost.length > 0 && newPost.length <= 500 && (
          <span>{newPost.length}/500 characters</span>
        )}
        <Form.Label htmlFor="post" className="sr-only">
          Post text
        </Form.Label>
        <Form.Control
          as="textarea"
          name="post"
          rows="5"
          className="resize-none border-pink"
          onChange={(e) => setNewPost(e.target.value)}
        ></Form.Control>
        <Button type="submit" className="pink-button mt-1 post-button">
          {sending ? "SENDING..." : "POST"}
        </Button>
      </Form.Group>
    </Form>
  );
}
