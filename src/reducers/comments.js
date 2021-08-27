import * as commentTypes from "../ActionTypes/commentTypes";

const commentsReducer = (
  state = {
    comments: [],
    loading: true,
    sending: false,
    sendingSuccess: false,
  },
  action
) => {
  switch (action.type) {
    case commentTypes.POST_COMMENT:
      return { ...state, comments: [...state.comments, action.payload.data], sendingSuccess: true };
    case commentTypes.NOT_SENDING:
      return { ...state, sending: false, sendingSuccess: false };
    case commentTypes.FETCH_COMMENTS:
      return { ...state, loading: false,comments: [...action.payload.data.reverse()] };
    case commentTypes.FETCH_SINGLE_COMMENT_REQUEST:
      return { ...state, loading: true, sending: false, sendingSuccess: false };
    case commentTypes.FETCH_SINGLE_COMMENT_SUCCESS:
      return { ...state, comments: [action.payload.data, ...state.comments], loading: false, sending: false, sendingSuccess: false };
    case commentTypes.MORE_COMMENTS:
      return {...state,loading: false, comments: [...action.payload.data.reverse(), ...state.comments]};
    case commentTypes.EDIT_COMMENT_REQUEST:
      return { ...state, sending: true, sendingSuccess: false, loading: false };
    case commentTypes.EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        sending: false,
        sendingSuccess: true,
        comments: state.comments.map((comment) =>
          comment._id === action.payload.data._id
            ? action.payload.data
            : comment
        ),
      };
    case commentTypes.TOGGLE_COMMENT_LIKE:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === action.payload.data._id
            ? action.payload.data
            : comment
        ),
      };
    case commentTypes.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload.data
        ),
      };
    default:
      return state;
  }
};

export default commentsReducer;
