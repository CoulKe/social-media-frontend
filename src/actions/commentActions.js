import axios from "axios";
import * as commentTypes from "../ActionTypes/commentTypes";
import { UPDATE_POST_SUCCESS } from "../ActionTypes/postTypes";

/**
 * Gets all comments within a set limit.
 * @param {string} postId - id of the post that was commented.
 * @param {string} lastCommentId -  id of the last comment fetched (`optional`).
 * @param {string} highlightId - id of the comment to be highlighted (`optional`). E.g from notifications.
 */
export const getComments =
  (postId, lastCommentId = "", highlightId = "") =>
  async (dispatch) => {
    const { data } = await axios({
      url: "/comments",
      method: "GET",
      params: {
        postId,
        lastCommentId,
        highlightId,
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
        type: commentTypes.MORE_COMMENTS,
        payload: {
          data: data.comments,
        },
      });
    } else {
      dispatch({
        type: commentTypes.FETCH_COMMENTS,
        payload: {
          data: data.comments,
        },
      });
    }
  };

/**
 * Gets a single comment.
 * @param {string} commentId - Id of the comment.
 * @param {string} postId - Id of the post.
 */
export const getSingleComment = (commentId, postId) => async (dispatch) => {
  try {
    dispatch({ type: commentTypes.FETCH_SINGLE_COMMENT_REQUEST });
    const { data } = await axios({
      url: "/comments/single",
      params: {
        commentId,
        postId,
      },
    });

    dispatch({
      type: commentTypes.FETCH_SINGLE_COMMENT_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * Creates a new comment and sends to the server.
 * @param {string} postId - Id of the post.
 * @param {string} newComment - Comment to be posted.
 */
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
    type: commentTypes.POST_COMMENT,
    payload: {
      data,
    },
  });
};

/**
 * Resets the sending property of the comment state.
 */
export const notSending = () => async (dispatch) => {
  dispatch({ type: commentTypes.NOT_SENDING });
};

/**
 * Updates a new comment.
 * @param {string} commentId - Id of the comment.
 * @param {string} editedComment - Comment text to be updated.
 */
export const editComment = (commentId, editedComment) => async (dispatch) => {
  try {
    dispatch({ type: commentTypes.EDIT_COMMENT_REQUEST });
    const { data } = await axios({
      url: "/comments",
      method: "PATCH",
      data: {
        commentId,
        comment: editedComment,
      },
    });

    dispatch({
      type: commentTypes.EDIT_COMMENT_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (err) {
    console.log(err.response);
  }
};

/**
 * Likes/Unlikes a comment.
 * @param {string} commentId - Id of the comment.
 * @param {string} postId - Id of the post commented.
 */
export const toggleLikeComment = (commentId, postId) => async (dispatch) => {
  const { data } = await axios({
    url: "/comment-likes",
    method: "POST",
    data: {
      commentId,
      postId,
    },
  });

  dispatch({
    type: commentTypes.EDIT_COMMENT_SUCCESS,
    payload: {
      data,
    },
  });
};

/**
 * Deletes a single comment.
 * @param {string} commentId - Id of the comment to be deleted.
 */
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
      type: commentTypes.DELETE_COMMENT,
      payload: {
        data: commentId,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
