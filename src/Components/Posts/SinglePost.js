import React, { useState, Suspense } from "react";
import PostButtons from "./PostButtons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Linkify } from "../../utils";
import { Spinner } from "react-bootstrap";

const PostControls = React.lazy(() => import("./PostControls"));

export default function SinglePost({ post }) {
  const history = useHistory();
  const [showEditButtons, setShowEditButtons] = useState(false);
  const onCancel = (value) => {
    setShowEditButtons(value);
  };
  const { pathname } = useLocation();
  const redirect = (e) => {
    let redirectPostUrl = `/comments?postId=${post._id}`;
    let text = "";

    if (!pathname.startsWith("/comments") && !e.target?.href) {
      if (document.getSelection) {
        text = document.getSelection().toString();
      } else if (document.seletion) {
        text = document.selection.createRange();
      }
      if (!text) {
        return history.push(redirectPostUrl);
      }
    }
  };
  return (
    <div className="post bg-white p-2">
      <div className="d-flex justify-content-between align-items-center">
        <Link
          to={`/profile?username=${post.user.username}`}
          className="font-weight-bold text-decoration-none pb-2 pt-2"
        >
          {`${post.user.first_name} ${post.user.last_name}`}{" "}
          <span className="username">@{post.user.username}</span>
        </Link>

        {!showEditButtons && (
          <div
            className="pr-4 pb-2 pt-2 d-inline"
            style={{ cursor: "pointer" }}
            onClick={(value) => {
              setShowEditButtons(value);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="3" height="11" viewBox="0 0 3 11"><defs><clipPath id="a">     <rect width="3" height="11" fill="none" />   </clipPath>
              </defs>
              <g transform="translate(-3179 -1411)"> <g transform="translate(3179 1411)" clipPath="url(#a)">   <g transform="translate(-3179 -1411)">     <circle       cx="1.5"       cy="1.5"       r="1.5"       transform="translate(3179 1411)"       fill="#212121"     />   </g>   <g transform="translate(-3179 -1407)">     <circle       cx="1.5"       cy="1.5"       r="1.5"       transform="translate(3179 1411)"       fill="#212121"     />   </g>   <g transform="translate(-3179 -1403)">     <circle       cx="1.5"       cy="1.5"       r="1.5"       transform="translate(3179 1411)"       fill="#212121"     />   </g> </g>
              </g>
            </svg>
          </div>
        )}
        {showEditButtons && (
          <Suspense
            fallback={
              <Spinner
                animation="border"
                style={{
                  width: "20px",
                  height: "20px",
                  borderBottom: "4px solid #282828",
                }}
              />
            }
          >
            <PostControls
              post={post}
              key={`${post.user.username}-${post._id}`}
              onCancel={onCancel}
            />
          </Suspense>
        )}
      </div>
      <pre onClick={redirect}>
        <Linkify text={post.post} key={`linkify-${post._id}`} />
      </pre>
      <PostButtons post={post} key={`${post.user.first_name}-${post._id}`} />
    </div>
  );
}
