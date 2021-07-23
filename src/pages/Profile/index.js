import React, { useEffect, useState,Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import queryString from "query-string";
import Wrapper, { FollowsWrapper, ProfileCta } from "./styles";
import PostComponent from "../../Components/Posts/";
import LoadMoreButton from "../../Components/Posts/LoadMore";
import PostBox from "../../Components/Posts/PostBox";
import { toggleFollow } from "../../actions/followsActions";
import { fetchProfileData, updateBio } from "../../actions/profileActions";
import Meta from "../../Components/Meta";
import ProfilePic from "../../coul.png";

const Profile = ({ location }) => {
  const [showBioForm, setShowBioForm] = useState(false);
  const [bioValues, setBioValues] = useState("");
  const [showPostBox, setShowPostBox] = useState(false);
  const dispatch = useDispatch();
  const { userInfo, posts, isFollowing } = useSelector(
    (state) => state.profile
  );

  let authId = localStorage.getItem("id");
  let authUsername = localStorage.getItem("loggedUser");
  let pageUser;

  if (location.search) {
    pageUser = queryString.parse(location.search)?.username;
  } else {
    pageUser = localStorage.getItem("loggedUser");
  }
  const handleBioUpdate = function (e) {
    e.preventDefault();
    dispatch(updateBio(bioValues));
    setShowBioForm(false);
  };

  // Get user data
  useEffect(() => {
    if (pageUser && !userInfo.length) {
      dispatch(fetchProfileData(pageUser));
    }
  }, [dispatch, pageUser, userInfo.length]);

  const loadMore = function (e) {
    e.preventDefault();
    if (posts.length > 0) {
      let lastId = posts[posts.length - 1]._id;
      dispatch(fetchProfileData(pageUser, lastId));
    }
  };

  const handleFollow = function () {
    if (authId !== userInfo._id) {
      dispatch(toggleFollow(authId, userInfo._id));
    } else {
      alert("You can't follow yourself");
    }
  };

  return (
    <Wrapper>
      {!pageUser && (
        <>
          <Meta title="Error" />
          <main>
            <h1>That user doesn't exists</h1>
          </main>
        </>
      )}
      {userInfo && (
        <>
          {userInfo.last_name && userInfo.first_name ? (
            <Meta title={`${userInfo.first_name} ${userInfo.last_name}`} />
          ) : (
            ""
          )}
          {/* Load image if user is admin else create stylized text. */}
          {userInfo && userInfo.username === "admin" && (
            <img src={ProfilePic} alt={`${userInfo.first_name} ${userInfo.last_name}`} />
          )}
          {userInfo.username && userInfo.username !== "admin" && (
            <div
              className={"image-text"}
            >{`${userInfo.first_name[0]}${userInfo.last_name[0]}`}</div>
          )}

          <h1>{`${userInfo.first_name} ${userInfo.last_name}`}</h1>
          <section id="bio">
            {userInfo.bio && <pre>{userInfo.bio}</pre>}
            {showBioForm && (
              <Form method="POST" id="bio-form" onSubmit={handleBioUpdate}>
                <Form.Group className="p-2">
                  <Form.Label className="sr-only">Bio: </Form.Label>
                  <Form.Control
                    name="bio"
                    as="textarea"
                    autoFocus
                    rows="5"
                    className="resize-none border-pink"
                    onChange={(e) => setBioValues(() => e.target.value)}
                  ></Form.Control>
                  <button className="w-100 p-2 rounded text-uppercase save-bio">
                    Save bio
                  </button>
                </Form.Group>
              </Form>
            )}
          </section>
          {authUsername === pageUser && (
            <div className="text-center font-weight-bold">
              <button
                className="d-block mx-auto edit-button"
                id="bio-edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowBioForm(true);
                }}
              >
                Edit bio
              </button>
              <Link
                to={"/edit-profile"}
                className="d-block mx-auto edit-button"
              >
                Edit profile
              </Link>
            </div>
          )}
          {location.search && authUsername !== pageUser && (
            <ProfileCta>
              <Link
                className="pink-button"
                to={`/messages/${userInfo.username}`}
              >
                Message
              </Link>
              <button className="pink-button" onClick={handleFollow}>
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </ProfileCta>
          )}
          <FollowsWrapper className="p-2">
            <Link to={`/followers?username=${pageUser}`}>
              <b>
                {userInfo.followersCount > 1099
                  ? numeral(userInfo.followersCount).format("0.0 a", Math.floor)
                  : numeral(userInfo.followersCount).format("0 a", Math.floor)}
              </b>{" "}
              Followers
            </Link>{" "}
            &nbsp;
            <Link to={`/followings?username=${pageUser}`}>
              <b>
                {userInfo.followingsCount > 1099
                  ? numeral(userInfo.followingsCount).format(
                      "0.0 a",
                      Math.floor
                    )
                  : numeral(userInfo.followingsCount).format("0 a", Math.floor)}
              </b>{" "}
              Following
            </Link>
          </FollowsWrapper>
          <div id="details" className="border-bottom">
            {userInfo.residence && <p>From {userInfo.residence}</p>}
            {userInfo.school && <p>Studied at {userInfo.school}</p>}
          </div>
          {showPostBox ? <PostBox /> : ""}
          {!showPostBox &&
          (queryString.parse(location.search)?.username === authUsername ||
            !queryString.parse(location.search)?.username) ? (
            <div
              onClick={() => setShowPostBox(true)}
              className="cursor-pointer rounded-pill border-pink d-flex justify-content-center align-content-center"
            >
              <p className="m-0 p-2">Click to share what's happening</p>
            </div>
          ) : (
            ""
          )}
          <div id="pinned">
            <h1>Pinned post</h1>
            <pre>
              "Believe in yourself even if your chances are one in a million"
              -Jim Carrey
            </pre>
          </div>
        </>
      )}
      <div id="posts">
        
        {posts.length ? <PostComponent posts={posts} /> : "loading"}
        {posts.length && <LoadMoreButton cb={loadMore} />}
      </div>
    </Wrapper>
  );
};

export default Profile;
