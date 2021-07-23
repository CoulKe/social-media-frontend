import axios from "axios";
import {
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  FETCH_ALL_POSTS_FINISHED,
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_REQUEST,
  UPDATE_POST_SUCCESS,
  STORE_POST_SUCCESS,
} from "../ActionTypes/postTypes";

export const fetchPosts =
  (lastId = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: FETCH_ALL_POSTS_REQUEST });

      let username = localStorage.getItem("loggedUser");
      const { data } = await axios("/posts", { 
        params: { 
          lastId,
          username
        } 
      });
      // check if there are any posts
      if (data.posts.length < 1) {
        return dispatch({ type: FETCH_ALL_POSTS_FINISHED });
      } else {
        return dispatch({
          type: FETCH_ALL_POSTS_SUCCESS,
          payload: {
            data: data.posts,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const storePost =
  (post = "") =>
  async (dispatch) => {
    if (post.length > 500 || post.length < 1) {
      return;
    }
    try {
      const { data } = await axios("/posts", {
        method: "POST",
        data: {
          post,
        },
      });

      dispatch({
        type: STORE_POST_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };
export const editPost =
  (postId = "", post = "") =>
  async (dispatch) => {
    try {
      const { data } = await axios("/posts/edit", {
        method: "PATCH",
        data: {
          postId,
          post,
        },
      });

      dispatch({
        type: UPDATE_POST_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

export const deletePost = (postId) => async (dispatch) => {
  dispatch({
    type: DELETE_POST_REQUEST,
  });
  try {
    await axios("/posts/delete", {
      method: "DELETE",
      data: {
        postId,
      },
    });
    console.log(postId);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: {
        data: postId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
