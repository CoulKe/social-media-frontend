import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
=======
import {Spinner} from "react-bootstrap";
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
import PostComponent from "../../Components/Posts/";
import LoadMoreButton from "../../Components/Posts/LoadMore";
import PostBox from "../../Components/Posts/PostBox";
import { fetchPosts } from "../../actions/postActions";
import Meta from "../../Components/Meta";
import Skeleton from "react-loading-skeleton";

const Home = () => {
  const dispatch = useDispatch();
  const {posts, loading, finished, sending, sendingSuccess} = useSelector((state) => state.posts);
<<<<<<< HEAD
  const {isLogged} = useSelector((state) => state.login);
=======
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts]);

  const loadMore = function(e){
    e.preventDefault();
    if(posts.length > 0){
      let lastId = posts[posts.length - 1]._id;
      dispatch(fetchPosts(lastId))
    }
  }

  return (
      <section>
        <PostBox sending={sending} sendingSuccess={sendingSuccess} />
        <Meta title="Home" />
        {!loading ? <PostComponent posts={posts} key={posts.length}/> : <Skeleton height={100} count={10}/>}
<<<<<<< HEAD

        {posts?.length && !loading && !finished && isLogged ? (
          <LoadMoreButton cb={loadMore}/>
        )
         : ""}
        {!loading && !isLogged ? (
          <h3 className="text-center">Login to see more posts or search</h3>
        )
         : ""}
=======
        {/* {!loading ? <PostComponent posts={posts} key={posts.length}/> : <div className="text-center">
        <Spinner animation="border"></Spinner> <br />
        <p>Getting posts</p>
        </div>} */}

        {posts.length && !loading && !finished ? (
          <LoadMoreButton cb={loadMore}/>
        )
         : ""}
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
         {finished && !loading ? <h1 className="text-center">No more posts to fetch</h1> : ""}
      </section>
  );
};

export default Home;
