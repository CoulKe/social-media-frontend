import axios from "axios";
import * as searchTypes from "../ActionTypes/searchTypes";

/**
 * Searches data in the database.
 * @param {string} value - Text to be searched.
 * @param {*} searchFilter - Filter what to search (users | posts) `optional`;
 */
export const search = (value, searchFilter="") => async (dispatch) => {
  dispatch({type: searchTypes.SEARCH_REQUEST});
  const { data } = await axios({
    method: "GET",
    url: "/search",
    params: {
      value,
      searchFilter
    },
  });

  dispatch({
    type: searchTypes.SEARCH_SUCCESSFULL,
    payload: {
      data,
    },
  });
};