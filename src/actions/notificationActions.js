import axios from "axios";
import * as notificationTypes from "../ActionTypes/notificationTypes";

export const resetHasNew = () => async (dispatch) => {
  dispatch({
    type: notificationTypes.RESET_HAS_NEW
  });
}

/**Fetches all notifications for the logged user.*/
export const fetchNotifications = () => async (dispatch) => {
  try {
    dispatch({ type: notificationTypes.FETCH_NOTIFICATIONS_REQUEST });
    const { data } = await axios("/notifications");

    dispatch({
      type: notificationTypes.FETCH_NOTIFICATIONS_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const checkNewNotification = () => async (dispatch) => {
  try {
    const { data } = await axios("/notifications/check-new");

    dispatch({
      type: notificationTypes.CHECK_NEW_NOTIFICATION,
      payload: {
        data: data.hasNew,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewNotifications =
  (lastId = "") =>
  async (dispatch) => {
    try {
      const { data } = await axios({
        url: "/notifications/new",
        method: "GET",
        params: {
          lastId,
        },
      });


      dispatch({
        type: notificationTypes.FETCH_NEW_NOTIFICATIONS_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (err) {
      return null;
    }
  };

/**
 * Marks a single notification of the authenticated user as read.
 * @param {string} notificationId - Id of the notificaton to be marked as read.
 */
export const readOneNotification = (notificationId) => async (dispatch) => {
  try {
    const { data } = await axios("notifications/read-single", {
      method: "PATCH",
      data: {
        notificationId,
      },
    });
    dispatch({
      type: notificationTypes.READ_ONE_NOTIFICATION,
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Marks all notifications of the authenticated user as read.
 */
export const readAllNotification = () => async (dispatch) => {
  try {
    await axios({
      url: "/notifications/read-all",
      method: "PATCH",
    });

    dispatch({
      type: notificationTypes.READ_ALL_NOTIFICATIONS,
    });
  } catch (err) {
    console.log(err);
  }
};
