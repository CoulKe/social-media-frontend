import React,{useState} from "react";
import queryString from "query-string";
import { useDispatch,useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { editComment } from "../../actions/commentActions";
import Meta from "../../Components/Meta";

export default function PostEdit({location}) {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const commentId = queryString.parse(location.search).commentId
    const comment = comments.find(comment => comment._id === commentId)
    
    const [editedComment, setEditedComment] = useState(comment.comment)

  return (
    <main>
    <Meta title="Comment edit" />
    comments
      <Form onSubmit={(e) => {
        e.preventDefault();
        dispatch(editComment(comment._id, editedComment));
      }}>
        <Form.Group>
          <Form.Label htmlFor="post" className="sr-only">
            Text of post to update
          </Form.Label>
          <Form.Control
            as="textarea"
            name="post"
            rows="5"
            className="resize-none border-pink"
            defaultValue={editedComment}
            onChange={e => setEditedComment(e.target.value)}
          ></Form.Control>
          <Button type="submit" className="pink-button mt-1 post-button">
            Update Comment
          </Button>
        </Form.Group>
      </Form>
    </main>
  );
}
