/**Reducers for searching data. */
import { SEARCH } from "../ActionTypes/searchTypes";

const searchReducers = (data = [{ users: [], posts: [] }], action) => {
  switch (action.type) {
    case SEARCH:
      return {
        users: action.payload.data.users,
        posts: action.payload.data.posts,
      };

    default:
      return data;
  }
};

export default searchReducers;
