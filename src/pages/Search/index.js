import React, { useState } from "react";
<<<<<<< HEAD
=======
import queryString from "query-string";
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { Wrapper } from "./style";
import { search } from "../../actions/searchActions";
import Meta from "../../Components/Meta";
import { Link } from "react-router-dom";
import SinglePost from "../../Components/Posts/SinglePost";

export default function Search() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
<<<<<<< HEAD
  const { users, posts, loading } = useSelector(
=======
  const { users, posts, loading, finished } = useSelector(
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
    (state) => state.search
  );

  return (
    <Wrapper>
      <Meta title="Search" />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(search(searchValue));
        }}
      >
        <Form.Label htmlFor="search" className="sr-only">
          Search
        </Form.Label>
        <div className="d-flex">
          <Form.Control
            name="search"
            placeholder="What should I search?"
            onChange={(e) => setSearchValue(e.target.value)}
          ></Form.Control>
          <button type="submit" className="pink-button text-white w-25">
            Search all
          </button>
        </div>
      </Form>
      {/* Search options */}
      <div className="search-options">
        <button
          onClick={(e) => {
            dispatch(search(searchValue, "users"));
          }}
          role="search"
          style={{ borderRight: "2px solid #000" }}
        >
          Users
        </button>
        <button
          onClick={(e) => {
            dispatch(search(searchValue, "posts"));
          }}
          role="search"
        >
          Posts
        </button>
      </div>
      {users?.length > 0 && (
        <section>
          <h1>Users</h1>
          <div className="users-result">
            {users.map((user, index) => (
              <p key={index}>
                <Link to={`/profile?username=${user.username}`}>
                  {user.first_name} {user.last_name}
                </Link>
              </p>
            ))}
          </div>
        </section>
      )}
      {posts?.length > 0 && (
        <section>
          <h1>Posts</h1>
          {posts.map((post, index) => (
            <SinglePost key={index} post={post} />
          ))}
        </section>
      )}

      {!loading && !users.length && !posts.length && (
        <div>
          <h1>No data found</h1>
        </div>
      )}
    </Wrapper>
  );
}
