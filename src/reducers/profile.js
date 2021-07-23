/**Reducers for getting user specific user and his details. */
import { TOGGLE_FOLLOW } from "../ActionTypes/followTypes";
import {
  FETCH_USER_POSTS,
  UPDATE_USER_INFO,
} from "../ActionTypes/profileTypes";

const profileReducers = (data = { userInfo: {}, posts: {} }, action) => {
  switch (action.type) {
    //   case "STORE_POST":
    //     return [...data, ...action.payload.posts];

    case FETCH_USER_POSTS:
      return { ...action.payload.data };
    case UPDATE_USER_INFO:
      return { ...data, userInfo: action.payload.data };
    case TOGGLE_FOLLOW:
      return { ...data, ...action.payload.data };

    default:
      return data;
  }
};

export default profileReducers;
