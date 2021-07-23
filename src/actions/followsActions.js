import axios from "axios";
import { GET_FOLLOWERS, GET_FOLLOWINGS, TOGGLE_FOLLOW} from "../ActionTypes/followTypes";


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
 *
 * @param {string} userId - Authenticated user
 * @param {string} following_id - Person followed/unfollowed
 * @returns
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
