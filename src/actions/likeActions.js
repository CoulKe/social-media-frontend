import axios from "axios";
import { TOGGLE_LIKE_SUCCESS } from "../ActionTypes/likeTypes";

/**
 * Likes/Unlikes a post.
 * @param {string} postId - Id of the post to toggle like.
 */
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
