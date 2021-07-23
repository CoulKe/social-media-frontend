import { GET_FOLLOWINGS } from "../ActionTypes/followTypes";

const followingsReducer = (followings = [], action) => {
  switch (action.type) {
    case GET_FOLLOWINGS:
      return [...action.payload.data];
    default:
      return followings;
  }
};

export default followingsReducer;
