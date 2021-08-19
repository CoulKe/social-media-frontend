import * as authTypes from "../ActionTypes/loginTypes"

const authReducer = (state = { isLogged: false, loginOut: false }, action) => {
  switch (action.type) {
    case authTypes.CONFIRM_IF_LOGGED_IN:
      return { loginOut: false, isLogged: true };
    case authTypes.LOGGED_OUT:
      return { isLogged: false, loginOut: false };
    case authTypes.LOGIN_OUT_REQUEST:
      return { isLogged: true, loginOut: true };
    default:
      return state;
  }
};

export default authReducer;
