import * as hashtagActions from "../ActionTypes/hashtagTypes";

const hashtagsReducer = (
  state = { posts: [], loading: true, finished: false },
  action
) => {
  switch (action.type) {
    case hashtagActions.FETCH_HASHTAGS_SUCCESS:
      return {
        ...state,
        posts: [...action.payload.data],
        loading: false,
        finished: false,
      };
    case hashtagActions.FETCH_MORE_HASHTAGS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.data],
        loading: false,
        finished: false,
      };
    case hashtagActions.FETCH_HASHTAGS_FINISHED:
      return {
        ...state,
        loading: false,
        finished: true,
      };
    default:
      return state;
  }
};

export default hashtagsReducer;
