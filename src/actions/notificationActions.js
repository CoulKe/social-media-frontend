import axios from "axios";
import {
  FETCH_NOTIFICATIONS,
  READ_ALL_NOTIFICATIONS,
  READ_ONE_NOTIFICATION,
} from "../ActionTypes/notificationTypes";

/**Fetches all notifications for the logged user.*/
export const fetchNotifications = () => async (dispatch) => {
  try {
    const { data } = await axios("/notifications");
    console.log(data[0]);
    dispatch({
      type: FETCH_NOTIFICATIONS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const readOneNotification = (notificationId) => async (dispatch) => {
  try {
    const {data} = await axios("notifications/read-single",{
       method: "PATCH",
       data: {
        notificationId
       }
    });
    console.log("notification data: ",data);
    dispatch({
      type: READ_ONE_NOTIFICATION,
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const readAllNotification = () => async (dispatch) => {
  try {
    await axios({
      url: "/notifications/read-all",
      method: "PATCH",
    });

    dispatch({
      type: READ_ALL_NOTIFICATIONS,
    });
  } catch (err) {
    console.log(err);
  }
};
