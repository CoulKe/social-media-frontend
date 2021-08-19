import axios from "axios";
import * as profileTypes from "../ActionTypes/profileTypes";

/**
 * Updates the authenticated user's bio.
 * @param {string} bio - Text of the bio to update.
 */
export const updateBio = (bio) => async (dispatch) => {
  try {
    const { data } = await axios({
      url: "/profile/bio",
      method: "PATCH",
      data: {
        bio,
      },
    });

    dispatch({
      type: profileTypes.UPDATE_USER_INFO,
      payload: {
        data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * Updates details of the authenticated user.
 * @param {object} formData - Object containing field name and field value pair.
 */
export const updatePersonalDetails = (formData) => async (dispatch) => {
  try {
    const { data } = await axios({
      url: "/profile/details",
      method: "PATCH",
      data: {
        ...formData,
      },
    });

    dispatch({
      type: profileTypes.UPDATE_USER_INFO,
      payload: {
        data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
/**
 * Fetches data, including posts of a single user.
 * @param {string} pageUser - User of the profile page visited.
 * @param {string} lastId - Id of the last profile post (`optional`).
 */
export const fetchProfileData =
  (pageUser, lastId = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: profileTypes.FETCH_USER_POSTS_REQUEST });

      const { data } = await axios("/profile", {
        method: "GET",
        params: {
          username: pageUser,
          lastId: lastId,
        },
      });
      dispatch({
        type: profileTypes.FETCH_USER_POSTS_SUCCESS,
        payload: {
          data,
          lastId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
