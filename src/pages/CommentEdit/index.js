import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import {
  editComment,
  getSingleComment,
  notSending,
} from "../../actions/commentActions";
import Meta from "../../Components/Meta";

export default function CommentEdit({ location }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { comments, sending, sendingSuccess } = useSelector(
    (state) => state.comments
  );
  const { commentId, postId } = queryString.parse(location.search);
  const comment = comments.find((comment) => comment._id === commentId);

  const [editedComment, setEditedComment] = useState("");

  useEffect(() => {
    if (!comment) {
      dispatch(getSingleComment(commentId, postId));
    }
    if (!editedComment && comment) {
      setEditedComment(comment.comment);
    }
  }, [comment, commentId, dispatch, editedComment, postId]);

  useEffect(() => {
    if (sendingSuccess && editedComment.length) {
      history.push(`/comments?postId=${postId}`);
    }
    return () => {
      dispatch(notSending());
    };
  }, [dispatch, editedComment, history, postId, sendingSuccess]);

  return (
    <section>
      <Meta title="Comment edit" />
      comments
      {comment ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(editComment(comment._id, editedComment));
          }}
        >
          <Form.Group>
            <Form.Label htmlFor="post" className="sr-only">
              Text of post to update
            </Form.Label>
            <Form.Control
              as="textarea"
              name="post"
              rows="5"
              readOnly = {sendingSuccess ? true : false}
              className="resize-none border-pink"
              defaultValue={comment.comment}
              onChange={(e) => setEditedComment(e.target.value)}
            ></Form.Control>
            {!sendingSuccess ? <Button type="submit" className="pink-button mt-1 post-button">
              {!sending ? "Update Comment" : "Updating"}
              {sendingSuccess ? "Redirecting" : ""}
            </Button> : ""}
            {sendingSuccess ? <Button type="submit" className="pink-button mt-1 post-button">
              Redirecting
            </Button>: ""}
          </Form.Group>
        </Form>
      ) : (
        ""
      )}
    </section>
  );
}
