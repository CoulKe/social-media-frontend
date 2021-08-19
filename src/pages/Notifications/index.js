import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  fetchNotifications,
  readAllNotification,
  fetchNewNotifications
} from "../../actions/notificationActions";
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
      dispatch(fetchNotifications());
    }
  }, [dispatch, notifications]);

  useEffect(() => {
    const newNotificationTimer = setInterval(() => {
      dispatch(fetchNewNotifications(lastId));
    }, 1000);

    return () => {
      clearInterval(newNotificationTimer);
    }
  }, [dispatch, lastId]);

  // const markAsRead = function () {
  //   dispatch(readAllNotification());
  // };

  return (
    <section>
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
