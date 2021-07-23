import axios from "axios";
import { SEARCH } from "../ActionTypes/searchTypes";

/**
 *
 * @param {string} value
 * @returns
 */
export const search = (value) => async (dispatch) => {
  const { data } = await axios({
    method: "GET",
    url: "/search",
    params: {
      value,
    },
  });
  console.log(data);
  dispatch({
    type: SEARCH,
    payload: {
      data,
    },
  });
};
