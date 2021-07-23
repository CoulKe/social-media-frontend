import React, { useEffect, useState, useRef } from "react";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { CommentsBlock } from "./style";
import SinglePost from "../../Components/Posts/SinglePost";
import SendIcon from "../../icons/send.svg";
import SingleComment from "../../Components/Comments/SingleComment";
import { getComments, postComment } from "../../actions/commentActions";
import { readOneNotification } from "../../actions/notificationActions";
import Meta from "../../Components/Meta";

export default function Comment({ location }) {
  const dispatch = useDispatch();
  const textRow = useRef(1);
  const [newComment, setNewComment] = useState("");
  const { posts } = useSelector((state) => state.posts);
  const notifications = useSelector((state) => state.notifications);
  const comments = useSelector((state) => state.comments);
  let {postId, notificationId, highlightId} = queryString.parse(location.search);

  let post = posts.find((post) => post._id === postId);
  let existingNotification = "";
  if(notificationId && notifications.length){
    existingNotification = notifications.find(notification => notification._id.toString() === notificationId.toString());
  }

  useEffect(() => {
    if(highlightId){
      dispatch(getComments(postId, undefined,highlightId));
    }
    else{
      dispatch(getComments(postId));
    }

  }, [dispatch, highlightId, postId]);

  useEffect(() => {
    // Check if notification id is not undefined

      if(notificationId){if(existingNotification?.viewed === false){
        dispatch(readOneNotification(existingNotification._id));
      }
    // If a user opens in new tab or if no notifications
    else {
      dispatch(readOneNotification(notificationId.toString()));
    }}
  }, [dispatch, existingNotification._id, existingNotification?.viewed, notificationId]);

  const loadPrevious = () => {
    let lastCommentId = comments[0]._id;
    highlightId ? dispatch(getComments(postId, lastCommentId, highlightId)) : dispatch(getComments(postId, lastCommentId));
  };

  return (
    <main>
    <Meta title="Comments" />
      {post && (
        <SinglePost post={post} key={`${post._id}-${post.date_created}`} />
      )}
      {post && parseInt(post.comments) > comments.length ? (
        <div className="d-flex">
          <button
            onClick={loadPrevious}
            className="previous-comments my-auto mx-auto text-center font-weight-bold"
          >
            Previous Comments
          </button>
        </div>
      ) : (
        ""
      )}

      <CommentsBlock className="bg-white p-2 pl-5 rounded">
        {comments.length
          ? comments.map((comment, index) => (
              <SingleComment comment={comment} postid={postId} key={index} />
            ))
          : "Loading..."}

        <Form
          className="comment-box p-0"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(postComment(postId, newComment));
          }}
        >
          <div className="d-flex">
            <textarea
              className="resize-none pl-2 border-0"
              placeholder="write a comment here"
              rows={textRow.current.toString()}
              onFocus={() => {
                document.addEventListener("keypress", function (e) {
                  if (e.key === "Enter" && textRow.current.toString() < 3) {
                    textRow.current += 1;
                  }
                });
              }}
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
            ></textarea>
            <button className="border-0" type="submit">
              <span className="sr-only">send comment</span>
              <img alt="send" src={SendIcon} />
            </button>
          </div>
        </Form>
      </CommentsBlock>
    </main>
  );
}
