/**Reducers for getting user specific user and his details. */
import { TOGGLE_FOLLOW } from "../ActionTypes/followTypes";
import * as profileTypes from "../ActionTypes/profileTypes";

const profileReducers = (
  state = { userInfo: {}, posts: {}, loading: true, isFollowing: false },
  action
) => {
  switch (action.type) {
    case profileTypes.FETCH_USER_POSTS_REQUEST:
      return { ...state, loading: true };
    case profileTypes.FETCH_USER_POSTS_SUCCESS:
      return { ...action.payload.data, loading: false };
    case profileTypes.UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload.data };
    case TOGGLE_FOLLOW:
      return { ...state, ...action.payload.data };

    default:
      return state;
  }
};

export default profileReducers;
