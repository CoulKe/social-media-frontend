/**Reducers for searching data. */
import * as searchTypes from "../ActionTypes/searchTypes";

const searchReducers = (
  data = { users: [], posts: [], loading: true, finished: false },
  action
) => {
  switch (action.type) {
    case searchTypes.SEARCH_SUCCESSFULL:
      return {
        loading: false,
        finished: false,
        users: action.payload.data.users,
        posts: action.payload.data.posts,
      };
    case searchTypes.SEARCH_REQUEST:
      return {
        ...data[0],
        loading: true,
      };

    default:
      return data;
  }
};

export default searchReducers;
