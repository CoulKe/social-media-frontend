import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  fetchNotifications,
  readAllNotification,
} from "../../actions/notificationActions";
import FormattedNotification from "../../Components/Notifications";
import Meta from "../../Components/Meta";

dayjs.extend(relativeTime);

export default function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);
  // const markAsRead = function () {
  //   dispatch(readAllNotification());
  // };

  return (
    <main>
    <Meta title="notifications" />
      <h1>Notifications</h1>
      <form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(readAllNotification());
        }}
      >
        <button type="submit">Mark all as read</button>
      </form>
      <div>
        {notifications
          ? notifications.map((notification, index) => (
              <FormattedNotification key={index} notification={notification} />
            ))
          : "No notifications"}
      </div>
    </main>
  );
}
