import { GET_FOLLOWERS } from "../ActionTypes/followTypes";

const followersReducer = (followers = [], action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return [...action.payload.data];
    default:
      return followers;
  }
};

export default followersReducer;
