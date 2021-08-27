import * as authTypes from "../ActionTypes/loginTypes";
import axios from "axios";

/**
 * Confirm if user is logged in.
 */
export const confirmLogin = () => async (dispatch) => {
  dispatch({
    type: authTypes.CONFIRM_IF_LOGGED_IN,
  });
};
/**
 * Confirm if user is logged out.
 */
export const confirmLogout = () => async (dispatch) => {
  dispatch({
    type: authTypes.CONFIRM_IF_LOGGED_OUT,
  });
};

/** Logs out the authenticated user. */
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: authTypes.LOGIN_OUT_REQUEST,
    });

    await axios({
      url: "/logout",
      method: "POST",
    });
    // Reset localStorage
    localStorage.clear();

    dispatch({
      type: authTypes.LOGGED_OUT,
    });

  } catch (err) {
    console.log(err);
  }
};
