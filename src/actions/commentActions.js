import axios from "axios";
import {
  FETCH_COMMENTS,
  POST_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  MORE_COMMENTS,
} from "../ActionTypes/commentTypes";
import { UPDATE_POST_SUCCESS } from "../ActionTypes/postTypes";

export const getComments =
  (postId, lastCommentId = "", highlightId="") =>
  async (dispatch) => {
    const { data } = await axios({
      url: "/comments",
      method: "GET",
      params: {
        postId,
        lastCommentId,
        highlightId
      },
    });

    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: {
        data: data.post,
      },
    });
    if (lastCommentId) {
      dispatch({
        type: MORE_COMMENTS,
        payload: {
          data: data.comments,
        },
      });
    } else {
      dispatch({
        type: FETCH_COMMENTS,
        payload: {
          data: data.comments,
        },
      });
    }
  };
export const postComment = (postId, newComment) => async (dispatch) => {
  const { data } = await axios({
    url: "/comments",
    method: "POST",
    data: {
      postId,
      comment: newComment,
    },
  });
  dispatch({
    type: POST_COMMENT,
    payload: {
      data,
    },
  });
};

export const editComment = (commentId, editedComment) => async (dispatch) => {
  const { data } = await axios({
    url: "/comments",
    method: "PATCH",
    data: {
      commentId,
      comment: editedComment,
    },
  });

  dispatch({
    type: EDIT_COMMENT,
    payload: {
      data,
    },
  });
};
export const likeComment = (commentId, postId) => async (dispatch) => {
  const { data } = await axios({
    url: "/comment-likes",
    method: "POST",
    data: {
      commentId,
      postId,
    },
  });

  dispatch({
    type: EDIT_COMMENT,
    payload: {
      data,
    },
  });
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    await axios({
      url: "/comments",
      method: "DELETE",
      data: {
        commentId,
      },
    });

    dispatch({
      type: DELETE_COMMENT,
      payload: {
        data: commentId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
