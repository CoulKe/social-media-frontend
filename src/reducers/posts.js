import { TOGGLE_LIKE_SUCCESS } from "../ActionTypes/likeTypes";
import {
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_REQUEST,
  FETCH_ALL_POSTS_FINISHED,
  STORE_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
} from "../ActionTypes/postTypes";

/** Reducer for posts */

// posts are the posts fetched
// loading checks if the request is ongoing
// finished checks if there are any posts to show left

const postsReducers = (
  state = { posts: [], loading: true, finished: false },
  action
) => {
  switch (action.type) {
    case STORE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.splice(0, 0, action.payload.data),
        loading: false,
        finished: false,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((data) =>
          data._id === action.payload.data._id
            ? { ...data, ...action.payload.data }
            : data
        ),
      };
    case DELETE_POST_REQUEST:
      return { ...state, loading: true, finished: false };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.data),
        loading: false,
        finished: false,
      };
    case FETCH_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...action.payload.data],
        loading: false,
        finished: false,
      };
    case FETCH_ALL_POSTS_FINISHED:
      return { ...state, loading: false, finished: true };
    case FETCH_ALL_POSTS_REQUEST:
      return { ...state, loading: true, finished: false };
    case TOGGLE_LIKE_SUCCESS:
      return {posts: state.posts.map((post) =>
        post._id === action.payload.data._id
          ? { ...action.payload.data, user: post["user"] }
          : post
      )}

    default:
      return state;
  }
};

export default postsReducers;
