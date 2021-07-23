import React, { useState } from "react";
import queryString from "query-string";
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
  const { users, posts } = useSelector((state) => state.search);
  console.log({ users, posts });

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
            Search
          </button>
        </div>
      </Form>
      {/* Search options */}
      <div className="search-options">
        <button role="search" style={{ borderRight: "2px solid #000" }}>
          People
        </button>
        <button role="search">Posts</button>
      </div>
      {users && (
        <section>
        <h1>Users</h1>
          {users.map((user, index) => (
            <Link key={index} to={`/profile?username=${user.username}`}>
              <p>
                {user.first_name} {user.last_name}
              </p>
            </Link>
          ))}
        </section>
      )}
      {posts && (
        <section>
        <h1>Posts</h1>
          {posts.map((post, index) => (
            <SinglePost key={index} post={post} />
          ))}
        </section>
      )}
    </Wrapper>
  );
}
