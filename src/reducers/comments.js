import {
  FETCH_COMMENTS,
  POST_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  MORE_COMMENTS,
} from "../ActionTypes/commentTypes";

const commentsReducer = (data = [], action) => {
  switch (action.type) {
    case POST_COMMENT:
      return [...data, action.payload.data];
    case FETCH_COMMENTS:
      return [...action.payload.data.reverse()];
    case MORE_COMMENTS:
      return [...action.payload.data.reverse(), ...data];
    case LIKE_COMMENT:
    case EDIT_COMMENT:
      return data.map((comment) =>
        comment._id === action.payload.data._id ? action.payload.data : comment
      );
    case DELETE_COMMENT:
      return data.filter((comment) => comment._id !== action.payload.data);
    default:
      return data;
  }
};

export default commentsReducer;
