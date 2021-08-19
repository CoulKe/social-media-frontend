import * as errorTypes from "../ActionTypes/errorTypes";

export const errorReducer = (state={msg: ""}, action) => {
  switch (action.type) {
    case errorTypes.SET_ERROR:
      break;
    case errorTypes.RESET_ERROR:
      return {msg: ""}
    default:
      return state;
  }
};
