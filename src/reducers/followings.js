import { GET_FOLLOWINGS } from "../ActionTypes/followTypes";

const followingsReducer = (state = {followings: [], loading: true}, action) => {
  switch (action.type) {
    case GET_FOLLOWINGS:
      return {...state, followings:[...action.payload.data]};
    default:
      return state;
  }
};

export default followingsReducer;
