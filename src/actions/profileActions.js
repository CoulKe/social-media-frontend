import axios from "axios";
import { FETCH_USER_POSTS, UPDATE_USER_INFO } from "../ActionTypes/profileTypes";

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
        type: UPDATE_USER_INFO,
        payload: {
          data,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
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
        type: UPDATE_USER_INFO,
        payload: {
          data,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  export const fetchProfileData =
    (pageUser, lastId = "") =>
    async (dispatch) => {
      try {
        const { data } = await axios("/profile", {
          method: "GET",
          params: {
            username: pageUser,
            lastId: lastId,
          },
        });
        dispatch({
          type: FETCH_USER_POSTS,
          payload: {
            data,
            lastId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
  