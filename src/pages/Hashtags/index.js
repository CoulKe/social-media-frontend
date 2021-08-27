import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHashtags, fetchMoreHashtags } from "../../actions/hashtagActions";
import SinglePost from "../../Components/Posts/SinglePost";
import Meta from "../../Components/Meta";
import LoadMoreButton from "../../Components/Posts/LoadMore";

export default function Index() {
  const params = useParams();
  const hashtag = params["hashtag"];
  const dispatch = useDispatch();
  const { posts, finished, loading } = useSelector((state) => state.hashtags);

  useEffect(() => {
    dispatch(fetchHashtags(hashtag));
  }, [dispatch, hashtag]);

  const loadMore = function (e) {
    e.preventDefault();
    if (posts.length > 0) {
      let lastId = posts[posts.length - 1]._id;
      dispatch(fetchMoreHashtags(hashtag, lastId));
    }
  };

  return (
    <section>
      <Meta title="Hashtags" />
      <h1>Hashtags</h1>
      {posts.map((hashtag, index) => (
        <SinglePost post={hashtag} key={index} />
      ))}
      {!loading && !finished ? <LoadMoreButton cb={loadMore} /> : ""}
      {finished ? <p>No more hashtags to fetch</p> : ""}
    </section>
  );
}
