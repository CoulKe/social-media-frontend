import { TOGGLE_LIKE_SUCCESS } from "../ActionTypes/likeTypes";
import * as postTypes from "../ActionTypes/postTypes";

/** Reducer for posts */

// posts are the posts fetched
// loading checks if the request is ongoing
// finished checks if there are any posts to show left

const postsReducers = (
  state = {
    posts: [],
    loading: true,
    sending: false,
    sendingSuccess: false,
    finished: false,
    pinning: false,
    pinningSuccess: false,
  },
  action
) => {
  switch (action.type) {
    case postTypes.STORE_POST_REQUEST:
      return {
        ...state,
        loading: false,
        finished: false,
        sending: true,
        sendingSuccess: false,
      };
    case postTypes.STORE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.splice(0, 0, action.payload.data),
        loading: false,
        finished: false,
        sending: false,
        sendingSuccess: true,
      };
    case postTypes.UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((data) =>
          data?._id === action.payload.data?._id
            ? { ...data, ...action.payload.data }
            : data
        ),
      };
    case postTypes.DELETE_POST_REQUEST:
      return { ...state, loading: true, finished: false };
    case postTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.data),
        loading: false,
        finished: false,
      };
    case postTypes.FETCH_ALL_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts,...action.payload.data],
        loading: false,
        finished: false,
      };
    case postTypes.FETCH_SINGLE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        finished: false,
      };
    case postTypes.FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload.data, ...state.posts],
        loading: false,
        finished: false,
      };
    case postTypes.FETCH_ALL_POSTS_FINISHED:
      return { ...state, loading: false, finished: true };
    case postTypes.FETCH_ALL_POSTS_REQUEST:
      return { ...state, loading: true, finished: false };
    case TOGGLE_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.data?._id
            ? { ...action.payload.data, user: post["user"] }
            : post
        ),
      };
    case postTypes.PIN_POST_REQUEST:
      return { ...state, pinning: true, pinningSuccess: false };
    case postTypes.PIN_POST_SUCCESS:
      const userId = localStorage.getItem("id");
      //Pinned post are unique for each user, below code pins one post of the authenticated user and unpins the other ones of the same user.
      return {
        ...state,
        pinning: false,
        pinningSuccess: true,
        posts: state.posts.map((post) =>
          post._id === action.payload.data?._id
            ? { ...action.payload.data }
            : post.user_id === userId
            ? { ...post, isPinned: false }
            : post
        ),
      };
    case postTypes.PINNING_POST_RESET:
      return { ...state, pinning: false, pinningSuccess: false };

    default:
      return state;
  }
};

// posts: state.posts.map(post => post.id === action.payload.data?._id ? {...action.payload.data} : post )};
export default postsReducers;
