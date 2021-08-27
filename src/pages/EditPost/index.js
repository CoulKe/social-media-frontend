import React,{useEffect, useState} from "react";
import { useHistory } from "react-router";
import queryString from "query-string";
import { useDispatch,useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { editPost, fetchSinglePost } from "../../actions/postActions";
import Meta from "../../Components/Meta";

export default function PostEdit({location}) {
    const dispatch = useDispatch();
    const history = useHistory()
    const [editedPost, setEditedPost] = useState("");
    const {loading, posts} = useSelector((state) => state.posts);
    const postId = queryString.parse(location.search).postId
    const post = posts?.find(post => post._id === postId)

    useEffect(() => {
      if(post){
        setEditedPost(post.post)
      }
    }, [post]);

    useEffect(()=>{
      if(!posts.length){
        dispatch(fetchSinglePost(postId));
      }
    },[dispatch, postId, posts]);

    const handleEdit = function(e){
        e.preventDefault();

        dispatch(editPost(postId, editedPost))
        history.replace(`/comments?postId=${postId}`)

    }

  return (
    <section>
    <Meta title="Edit post" />
      {loading ? <p>Loading</p> : !loading && post ? <Form onSubmit={handleEdit}>
        <Form.Group>
          <Form.Label htmlFor="post" className="sr-only">
            Text of post to update
          </Form.Label>
          <Form.Control
            as="textarea"
            name="post"
            rows="5"
            className="resize-none border-pink"
            defaultValue={post.post}
            onChange={e => setEditedPost(e.target.value)}
          ></Form.Control>
          <Button type="submit" className="pink-button mt-1 post-button">
            Update post
          </Button>
        </Form.Group>
      </Form>
      : (<h1 className="text-center">Post not found</h1>) }
    </section>
  );
}
