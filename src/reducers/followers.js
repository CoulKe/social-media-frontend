import { GET_FOLLOWERS } from "../ActionTypes/followTypes";

const followersReducer = (state = {followers: [], loading: true}, action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return {...state, followers: [...action.payload.data]};
    default:
      return state;
  }
};

export default followersReducer;
