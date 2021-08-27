import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
<<<<<<< HEAD
import * as notificationTypes from "../../actions/notificationActions";
=======
import {
  fetchNotifications,
  readAllNotification,
  fetchNewNotifications
} from "../../actions/notificationActions";
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
import FormattedNotification from "../../Components/Notifications";
import Meta from "../../Components/Meta";
import LoadingBlock from "../../Components/LoadingBlock";

dayjs.extend(relativeTime);

export default function Notifications() {
  const dispatch = useDispatch();
  const {notifications, loading} = useSelector((state) => state.notifications);
  // Take the first one as data is reversed for great usability
  let lastId = notifications[0]?._id || "";

  useEffect(() => {
    if(!notifications.length){
<<<<<<< HEAD
      dispatch(notificationTypes.fetchNotifications());
=======
      dispatch(fetchNotifications());
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
    }
  }, [dispatch, notifications]);

  useEffect(() => {
<<<<<<< HEAD
    dispatch(notificationTypes.resetHasNew())
  },[dispatch])

  useEffect(() => {
    const newNotificationTimer = setInterval(() => {
      dispatch(notificationTypes.fetchNewNotifications(lastId));
=======
    const newNotificationTimer = setInterval(() => {
      dispatch(fetchNewNotifications(lastId));
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
    }, 1000);

    return () => {
      clearInterval(newNotificationTimer);
    }
  }, [dispatch, lastId]);

<<<<<<< HEAD
=======
  // const markAsRead = function () {
  //   dispatch(readAllNotification());
  // };

>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
  return (
    <section>
    <Meta title="notifications" />
      <h1>Notifications</h1>
      <form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
<<<<<<< HEAD
          dispatch(notificationTypes.readAllNotification());
=======
          dispatch(readAllNotification());
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
        }}
      >
        <button type="submit">Mark all as read</button>
      </form>
      <div>
      {loading ? <LoadingBlock text="Getting notifications..." showSpinner={false}/>:""}
        {notifications
          ? notifications.map((notification, index) => (
              <FormattedNotification key={index} notification={notification} />
            ))
          : "No notifications"}
      </div>
    </section>
  );
}
