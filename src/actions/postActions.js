import axios from "axios";
import * as postTypes from "../ActionTypes/postTypes";

/**
 * Fetches all posts within the set limit.
 * @param {string} lastId - Id of the last post fetched (`optional`).
 */
export const fetchPosts =
  (lastId = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: postTypes.FETCH_ALL_POSTS_REQUEST });

      let username = localStorage.getItem("loggedUser");
      const { data } = await axios("/posts", {
        params: {
          lastId,
          username,
        },
      });
      // check if there are any posts
      if (data.posts.length < 1) {
        return dispatch({ type: postTypes.FETCH_ALL_POSTS_FINISHED });
      } else {
        return dispatch({
          type: postTypes.FETCH_ALL_POSTS_SUCCESS,
          payload: {
            data: data.posts,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

/**
 * Fetches a single post.
 * @param {string} postId - Id of the post to fetch.
 */
export const fetchSinglePost =
  (postId = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: postTypes.FETCH_SINGLE_POST_REQUEST });

      const { data } = await axios("/posts/single", {
        params: {
          postId: postId,
        },
      });

      dispatch({
        type: postTypes.FETCH_SINGLE_POST_SUCCESS,
        payload: {
          data: data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

/**
 * Saves a new post to the database.
 * @param {string} post - New post to be created.
 */
export const storePost =
  (post = "") =>
  async (dispatch) => {
    if (post.length > 500 || post.length < 1) {
      return;
    }
    try {
      dispatch({
        type: postTypes.STORE_POST_REQUEST,
      });

      const { data } = await axios("/posts", {
        method: "POST",
        data: {
          post,
        },
      });

      dispatch({
        type: postTypes.STORE_POST_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

/**
 * Updates the specified post.
 * @param {string} postId - Id of the post to be edited.
 * @param {string} post - Post text to be updated.
 */
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
        type: postTypes.UPDATE_POST_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

/**
 * Unpins/Pins a single post to be highlighted as the main/first post on the user profile.
 * @param {string} postId - Id of the post to be pinned.
 */
export const togglePinPost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: postTypes.PIN_POST_REQUEST });

    const { data } = await axios("/posts/pin", {
      method: "PATCH",
      data: {
        postId,
      },
    });

    console.log(data);
    dispatch({ type: postTypes.PIN_POST_SUCCESS, payload: {data} });
  } catch (err) {
    console.log(err);
  }
};
/**Resets the pinning state. */
export const pinningPostReset = () => async (dispatch) => {
  try {
    dispatch({ type: postTypes.PINNING_POST_RESET });
  } catch (err) {
    console.log(err);
  }
};

/**
 * Deletes a single post.
 * @param {string} postId - Id of the post to be deleted.
 */
export const deletePost = (postId) => async (dispatch) => {
  dispatch({
    type: postTypes.DELETE_POST_REQUEST,
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
      type: postTypes.DELETE_POST_SUCCESS,
      payload: {
        data: postId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
