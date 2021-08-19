import axios from "axios";
import {
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  TOGGLE_FOLLOW,
} from "../ActionTypes/followTypes";

/**
 * Gets followers of a single user.
 * @param {string} username - User to get followers of.
 */
export const getFollowers = (username) => async (dispatch) => {
  const { data } = await axios({
    method: "GET",
    url: "/followers",
    params: {
      username,
    },
  });

  dispatch({
    type: GET_FOLLOWERS,
    payload: {
      data,
    },
  });
};

/**
 * Gets users the specified user is following.
 * @param {string} username - User to check their followings.
 */
export const getFollowings = (username) => async (dispatch) => {
  const { data } = await axios({
    method: "GET",
    url: "/followings",
    params: {
      username,
    },
  });

  dispatch({
    type: GET_FOLLOWINGS,
    payload: {
      data,
    },
  });
};
/**
 * Follows/Unfollows a user.
 * @param {string} userId - Authenticated user
 * @param {string} following_id - Person followed/unfollowed
 */
export const toggleFollow =
  (userId = "", following_id = "") =>
  async (dispatch) => {
    try {
      const { data } = await axios({
        url: "/follow",
        method: "POST",
        data: {
          user_id: userId,
          following_id,
        },
      });

      dispatch({
        type: TOGGLE_FOLLOW,
        payload: {
          data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
