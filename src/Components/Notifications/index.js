import React, { useRef } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Wrapper } from "./style";
import { FormatNotification } from "../../utils";

dayjs.extend(relativeTime);

export default function FormattedNotification({ notification }) {
  const refLink = useRef("");

  // like notification
  if (notification.type === "like") {
    refLink.current = `/comments?postId=${notification.link_id}&notificationId=${notification._id}`;
  }
  // comment notification
  else if (notification.type === "comment-like") {
    refLink.current = `/comments?postId=${notification.link_id}&highlightId=${notification.highlight_id}&notificationId=${notification._id}`;
  }
  // comment notification
  else if (notification.type === "comment") {
    refLink.current = `/comments?postId=${notification.link_id}&highlightId=${notification.highlight_id}&notificationId=${notification._id}`;
  }
  // Follow notification
  else if (notification.type === "follow") {
    refLink.current = `/followers?username=${notification.username}&notificationId=${notification._id}`;
  }
  // Alert notification
  else {
    refLink.current = `/comments?postId=${notification.link_id}&notificationId=${notification._id}`;
  }

  // format notification
  const separatedDescription = function (notification) {
    let descriptionFirstPart = notification?.description?.split('"', 1)[0];
    let descriptionSecondPart = notification?.description?.substring(
      descriptionFirstPart.length
    );
    console.log({ descriptionFirstPart });
    console.log({ descriptionSecondPart });
    return [descriptionFirstPart, descriptionSecondPart];
  };
  let [firstPart, secondPart] = separatedDescription(notification);

  return (
    <Wrapper hasViewed={notification.viewed}>
      {/* Not all notification will have links */}
      {refLink.current.length && notification.link_id ? (
        <Link className="w-100 d-block p-2" to={refLink.current}>
          <p>
            <FormatNotification text={firstPart} /> {secondPart}
          </p>

          <span className="d-block text-right">
            {dayjs(notification.date_updated).format("ddd h:m a")}
          </span>
        </Link>
      ) : // For follows
      notification.username ? (
        <Link to={refLink.current}>
          <p>
            <FormatNotification text={notification.description} />
          </p>
          <span className="d-block text-right">
            {dayjs(notification.date_updated).format("ddd h:m a")}
          </span>
        </Link>
      ) : (
        <button className="d-block w-100 text-left p-2">
          {notification.description}
        </button>
      )}
    </Wrapper>
  );
}
