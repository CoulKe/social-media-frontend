import React from "react";

import SinglePost from "./SinglePost";

export default function Posts({ posts }) {
  return (
    <div id="posts">
      {posts &&
        posts.map((post, index) => (
          <SinglePost post={post} key={`${post._id}${index}`}/>
        ))}
    </div>
  );
}
