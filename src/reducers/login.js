import * as authTypes from "../ActionTypes/loginTypes";

const authReducer = (state = { isLogged: null, loginOut: false }, action) => {
  switch (action.type) {
    case authTypes.CONFIRM_IF_LOGGED_IN:
      return { ...state, loginOut: false, isLogged: true };
    case authTypes.CONFIRM_IF_LOGGED_OUT:
      return { ...state, loginOut: false, isLogged: false };
    case authTypes.LOGGED_OUT:
      return { ...state, isLogged: false, loginOut: false };
    case authTypes.LOGIN_OUT_REQUEST:
      return { ...state, isLogged: true, loginOut: true };
    default:
      return state;
  }
};

export default authReducer;
