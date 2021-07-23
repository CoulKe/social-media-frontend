import axios from "axios";
import * as hashtagActions from "../ActionTypes/hashtagTypes";

/**
 * Fetches posts with the specified hashtag.
 * @param {string} hashtag - Route param
 * @param {string} lastId - Last fetched post id
 * @returns
 */
export const fetchHashtags = (hashtag = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: hashtagActions.FETCH_HASHTAGS_REQUEST });

      const { data } = await axios("/hashtags", {
        method: "GET",
        params: {
          hashtag,
        },
      });

      // check if there are any posts
      if (data.length < 1) {
        return dispatch({ type: hashtagActions.FETCH_HASHTAGS_FINISHED });
      } else {
        return dispatch({
          type: hashtagActions.FETCH_HASHTAGS_SUCCESS,
          payload: {
            data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
export const fetchMoreHashtags = (hashtag = "", lastId = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: hashtagActions.FETCH_HASHTAGS_REQUEST });

      const { data } = await axios("/hashtags", {
        method: "GET",
        params: {
          hashtag,
          lastId,
        },
      });

      // check if there are any posts
      if (data.length < 1) {
        return dispatch({ type: hashtagActions.FETCH_HASHTAGS_FINISHED });
      } else {
        return dispatch({
          type: hashtagActions.FETCH_MORE_HASHTAGS,
          payload: {
            data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
