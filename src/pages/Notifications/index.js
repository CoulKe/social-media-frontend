import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import * as notificationTypes from "../../actions/notificationActions";
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
      dispatch(notificationTypes.fetchNotifications());
    }
  }, [dispatch, notifications]);

  useEffect(() => {
    dispatch(notificationTypes.resetHasNew())
  },[dispatch])

  useEffect(() => {
    const newNotificationTimer = setInterval(() => {
      dispatch(notificationTypes.fetchNewNotifications(lastId));
    }, 1000);

    return () => {
      clearInterval(newNotificationTimer);
    }
  }, [dispatch, lastId]);

  return (
    <section>
    <Meta title="notifications" />
      <h1>Notifications</h1>
      <form
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(notificationTypes.readAllNotification());
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
