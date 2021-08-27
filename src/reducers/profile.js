/**Reducers for getting user specific user and his details. */
import { TOGGLE_FOLLOW } from "../ActionTypes/followTypes";
import * as profileTypes from "../ActionTypes/profileTypes";

const profileReducers = (
  state = {
    userInfo: {},
    posts: [],
    loading: true,
    isFollowing: false,
    updating: false,
    updated: false,
  },
  action
) => {
  switch (action.type) {
    case profileTypes.DELETE_POST_REQUEST:
      return { ...state, loading: true, finished: false };
    case profileTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.data),
        loading: false,
      };
    case profileTypes.FETCH_USER_POSTS_REQUEST:
      return { ...state, loading: true };
    case profileTypes.FETCH_USER_POSTS_SUCCESS:
      return { ...action.payload.data, loading: false };
<<<<<<< HEAD
    case profileTypes.RESET_UPDATING:
      return { ...state, updated: false, updating: false };
    case profileTypes.UPDATE_USER_INFO_REQUEST:
      return { ...state, updated: false, updating: true };
    case profileTypes.UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload.data, updated: true };
=======
    case profileTypes.UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload.data };
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
    case TOGGLE_FOLLOW:
      return { ...state, ...action.payload.data };

    default:
      return state;
  }
};

export default profileReducers;
