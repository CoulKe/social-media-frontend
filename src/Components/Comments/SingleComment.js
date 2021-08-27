import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { SingleComment as Wrapper } from "./style";
import { toggleLikeComment } from "../../actions/commentActions";
import { Spinner } from "react-bootstrap";

const CommentControls = React.lazy(() => import("./CommentControls"));

export default function SingleComment({ comment, postid }) {
  const dispatch = useDispatch();
  const [showEditButtons, setShowEditButtons] = useState(false);
  let postId = queryString.parse(window.location.search).postId;

  const onCancel = (value) => {
    setShowEditButtons(value);
  };
  return (
    <Wrapper key={comment._id}>
      <div className="d-flex justify-content-between align-items-center">
        <Link
          className="font-weight-bold"
          to={`/profile?username=${comment.username}`}
        >
          {comment.first_name} {comment.last_name}{" "}
          <span className="username">@{comment.username}</span>
        </Link>
        {!showEditButtons && (
          <div
            className="pr-4 pb-2 pt-2 d-inline"
            onClick={(value) => {
              setShowEditButtons(value);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="3"
              height="11"
              viewBox="0 0 3 11"
            >
              <defs>
                <clipPath id="a">
                  {" "}
                  <rect width="3" height="11" fill="none" />{" "}
                </clipPath>
              </defs>
              <g transform="translate(-3179 -1411)">
                {" "}
                <g transform="translate(3179 1411)" clipPath="url(#a)">
                  {" "}
                  <g transform="translate(-3179 -1411)">
                    {" "}
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      transform="translate(3179 1411)"
                      fill="#212121"
                    />{" "}
                  </g>{" "}
                  <g transform="translate(-3179 -1407)">
                    {" "}
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      transform="translate(3179 1411)"
                      fill="#212121"
                    />{" "}
                  </g>{" "}
                  <g transform="translate(-3179 -1403)">
                    {" "}
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      transform="translate(3179 1411)"
                      fill="#212121"
                    />{" "}
                  </g>{" "}
                </g>
              </g>
            </svg>
          </div>
        )}
        {showEditButtons && (
          <React.Suspense
            fallback={
              <Spinner
                animation="border"
                style={{
                  width: "20px",
                  height: "20px",
                  borderBottom: "4px solid #282828",
                }}
              ></Spinner>
            }
          >
            <CommentControls
              comment={comment}
              postId={postId}
              onCancel={onCancel}
            />
          </React.Suspense>
        )}
      </div>

      <pre>{comment.comment}</pre>
      {/* make event to be on click to not only make the button submit but also the form itself if clicked */}
      <form
        method="POST"
        onClick={(e) => {
          e.preventDefault();
          dispatch(toggleLikeComment(comment._id, postId));
        }}
      >
        <div>
          <button type="submit" className="border-0 bg-transparent">
            <span className="sr-only">like comment button</span>
            <svg
              className={comment.hasLiked ? "has-liked" : "not-liked"}
              xmlns="http://www.w3.org/2000/svg"
              width="12.845"
              height="13.352"
              viewBox="0 0 12.845 13.352"
            >
              <g transform="translate(0 0.005)">
                <path
                  d="M.42,5.6H3.28a.471.471,0,0,1,.42.507V12.84a.472.472,0,0,1-.42.507H.42A.471.471,0,0,1,0,12.84V6.111A.471.471,0,0,1,.42,5.6ZM6.592.556C6.813-.8,8.653.449,8.774,2.629a11.238,11.238,0,0,1-.157,2.309h2.629a1.643,1.643,0,0,1,1.374,2.54c.154.674.177,1.465-.24,1.777a2.918,2.918,0,0,1-.65,2.244,3.066,3.066,0,0,1-.338,1.368c-.353.6-.64.456-1.2.456H5.756A1.635,1.635,0,0,1,4.209,12.4V6.448C5.533,6.018,6.236,3.84,6.592,2.41V.556Z"
                  transform="translate(0 0)"
                  fillRule="evenodd"
                />
              </g>
            </svg>
          </button>
          <span className="mr-2">{comment.likes}</span>
        </div>
      </form>
    </Wrapper>
  );
}
