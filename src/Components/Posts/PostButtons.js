import React from "react";
import {useHistory} from "react-router-dom";
import {PostsButtons} from "./style";
import {Form} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { togglePostLike } from "../../actions/likeActions";

export default function PostButtons({post}) {
    const history = useHistory();
    const dispatch = useDispatch();

<<<<<<< HEAD
=======
  const likePost = function (postId) {
    dispatch(togglePostLike(postId));
  };
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
  return (
    <PostsButtons hasLiked={post.hasLiked}>
      {/* make event to be on click to not only make the button submit but also the form itself if clicked */}
      <Form
        method="POST"
        onClick={(e) => {
          e.preventDefault();
<<<<<<< HEAD
          dispatch(togglePostLike(post._id));
=======
          likePost(post._id);
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
        }}
      >
        <button type="submit" className="border-0 mx-auto like-button">
          <span className="sr-only">like button</span>
          <svg
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
        <span className="font-weight-bold">{post.likes}</span>
      </Form>
      <div
      className="d-flex"
        onClick={(e) => {
          e.preventDefault();
          history.push(`/comments?postId=${post._id}`);
        }}
      >
        <span className="mx-auto d-block">
          <span className="sr-only">Comment</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20.327"
            height="14.5"
            viewBox="0 0 20.327 14.5"
          >
            <g transform="translate(0 0.005)">
              <path
                d="M11.615,7.207c.323,0,.562-.171.562-.368s-.261-.368-.562-.368H4.461c-.321,0-.562.171-.562.368s.261.368.562.368ZM13.96,2.324,17.223.066a.449.449,0,0,1,.4-.041l2.624,1.664c.1.081.124.177-.022.273L16.9,4.261,13.96,2.324Zm1.855,2.66-3.363.455.425-2.393,2.938,1.938ZM3.45,1.541h7.522l-.55.761H3.45a2.993,2.993,0,0,0-1.615.44A1.3,1.3,0,0,0,1.163,3.8V9.2a1.308,1.308,0,0,0,.672,1.057,2.984,2.984,0,0,0,1.615.44h.708c.319.014.562.2.539.4L4.47,13.237l4.322-1.712a.755.755,0,0,1,.409-.11h6.727a2.983,2.983,0,0,0,1.615-.44,1.308,1.308,0,0,0,.672-1.057V5.949h1.2v5.037c.063,1.136-.645,1.775-3.5,1.853L10.1,12.752l-5.9,1.637-.029.015a.805.805,0,0,1-.818-.042.307.307,0,0,1-.139-.271L3.5,11.454H3.452a4.506,4.506,0,0,1-2.437-.663A1.962,1.962,0,0,1,0,9.2V3.8A1.97,1.97,0,0,1,1.013,2.2,4.5,4.5,0,0,1,3.45,1.541ZM14.364,9.25c.323,0,.562-.171.562-.368s-.261-.368-.562-.368h-9.9c-.321,0-.562.171-.562.368s.261.368.562.368ZM9.083,5.166c.321,0,.562-.171.562-.368s-.261-.368-.562-.368H4.461c-.321,0-.562.171-.562.368s.261.368.562.368Z"
                transform="translate(0 0)"
              />
            </g>
          </svg>
        </span>
        <span className="font-weight-bold ml-2">{post.comments}</span>
      </div>
    </PostsButtons>
  );
}
