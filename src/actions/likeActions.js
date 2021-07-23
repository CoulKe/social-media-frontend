import axios from "axios";
import { TOGGLE_LIKE_SUCCESS } from "../ActionTypes/likeTypes";

export const togglePostLike =
  (postId = "") =>
  async (dispatch) => {
    try {
      const { data } = await axios("/post-likes", {
        method: "POST",
        data: {
          postId,
        },
      });

      console.log(data);
      dispatch({
        type: TOGGLE_LIKE_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
