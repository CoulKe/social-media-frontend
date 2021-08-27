import React from "react";
import { Link } from "react-router-dom";

export function FollowersView({ followersData }) {

  return (
    <div className="pb-2">
      {followersData.map((followerData, index) => (
        <div key={index}>
          <Link className="font-weight-bold" to={`/profile?username=${followerData.follower.username}`}>
            <p>
              {followerData.follower.first_name}{" "}
              {followerData.follower.last_name}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
export function FollowingsView({ followingsData }) {
  return (
    <div className="pb-2">
      {followingsData.map((followingData, index) => (
        <div key={index}>
          <Link className="font-weight-bold" to={`/profile?username=${followingData.following.username}`}>
            <p>
              {followingData.following.first_name}{" "}
              {followingData.following.last_name}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
