import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import queryString from "query-string";
import Wrapper, { FollowsWrapper, ProfileCta } from "./styles";
import PostComponent from "../../Components/Posts/";
import LoadMoreButton from "../../Components/Posts/LoadMore";
import { toggleFollow } from "../../actions/followsActions";
import { fetchProfileData, updateBio } from "../../actions/profileActions";
import Meta from "../../Components/Meta";
import ProfilePic from "../../coul.png";
import Skeleton from "react-loading-skeleton";
import SinglePost from "../../Components/Posts/SinglePost";

const Profile = ({ location }) => {
  const [showBioForm, setShowBioForm] = useState(false);
  const [bioValues, setBioValues] = useState("");
  const [pinnedPost, setPinnedPost] = useState(null);
  const dispatch = useDispatch();
  const { userInfo, posts, isFollowing, loading } = useSelector(
    (state) => state.profile
  );

  let authId = localStorage.getItem("id");
  let authUsername = localStorage.getItem("loggedUser");
  let pageUser;

  useEffect(() => {
    if (posts.length) {
      let pin = posts.find((post) => post.isPinned === true && post?.user?.username === pageUser);
      setPinnedPost(() => pin);
    }
  }, [authUsername, pageUser, pinnedPost, posts]);

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
    if (pageUser) {
      dispatch(fetchProfileData(pageUser));
    }
  }, [dispatch, pageUser]);

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
          <section>
            <h1>That user doesn't exists</h1>
          </section>
        </>
      )}
      {userInfo && (
        <>
          {userInfo.last_name && userInfo.first_name ? (
            <Meta title={`${userInfo.first_name} ${userInfo.last_name}`} />
          ) : (
            ""
          )}
          {loading ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Skeleton circle={true} width={200} height={200} />
              </div>
              {/* Bio */}
              <Skeleton height={100} />
              {/* Edit buttons */}
              <Skeleton
                count={2}
                width={100}
                style={{ display: "block", margin: "6px auto" }}
              />
              {/* Followers & personal info */}
              <Skeleton
                count={3}
                width={150}
                style={{ display: "block", margin: "6px 0px" }}
              />
              {/* Post button*/}
              <Skeleton height={50} />
              {/* Pinned post*/}
              <Skeleton height={100} />
            </>
          ) : (
            ""
          )}

          {/* Load image if user is admin else create stylized text. */}
          {userInfo && userInfo.username === "admin" && (
            <img
              src={ProfilePic}
              alt={`${userInfo.first_name} ${userInfo.last_name}`}
            />
          )}
          {userInfo.username && userInfo.username !== "admin" && (
            <div
              className={"image-text big-image-text"}
            >{`${userInfo.first_name[0]}${userInfo.last_name[0]}`}</div>
          )}

          {!loading ? (
            <h1>{`${userInfo.first_name} ${userInfo.last_name}`}</h1>
          ) : (
            ""
          )}
          {!loading ? (
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
          ) : (
            ""
          )}
          {!loading && authUsername === pageUser && (
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
          {!loading && location.search && authUsername !== pageUser && (
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
          {!loading ? (
            <FollowsWrapper className="p-2">
              <Link to={`/followers?username=${pageUser}`}>
                <b>
                  {userInfo.followersCount > 1099
                    ? numeral(userInfo.followersCount).format(
                        "0.0 a",
                        Math.floor
                      )
                    : numeral(userInfo.followersCount).format(
                        "0 a",
                        Math.floor
                      )}
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
                    : numeral(userInfo.followingsCount).format(
                        "0 a",
                        Math.floor
                      )}
                </b>{" "}
                Following
              </Link>
            </FollowsWrapper>
          ) : (
            ""
          )}
          {!loading ? (
            <div id="details" className="border-bottom">
              {userInfo?.residence && <p>From {userInfo.residence}</p>}
              {userInfo?.school && <p>Studied at {userInfo.school}</p>}
            </div>
          ) : (
            ""
          )}
          {pinnedPost ? (
            <div id="pinned">
              <h1>Pinned post</h1>
              <SinglePost post={pinnedPost} />
            </div>
          ) : (
            ""
          )}
        </>
      )}
      {!loading ? (
        <div id="posts">
          {posts.length ? <PostComponent posts={posts} /> : <h1 className="text-center">No posts</h1>}
          {posts.length && <LoadMoreButton cb={loadMore} />}
        </div>
      ) : (
        ""
      )}
    </Wrapper>
  );
};

export default Profile;
