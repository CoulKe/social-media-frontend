import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { FollowersView } from "../../Components/Follows";
import { Wrapper, TitleWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../actions/followsActions";
import Meta from "../../Components/Meta";

export default function FollowersPage({location}) {
  const dispatch = useDispatch();

  const {followers} = useSelector(state => state.followers)

  let pageUser;

  if (location.search) {
    pageUser = queryString.parse(location.search).username;
  } else {
    pageUser = localStorage.getItem("loggedUser");
  }


  useEffect(() => {
      dispatch(getFollowers(pageUser))
  }, [dispatch, pageUser]);

  return (
    <Wrapper className="bg-white rounded">
    <Meta title="Followers" />
      <TitleWrapper>
      <Link to={`/followers?username=${pageUser}`} className="active-border">
          Followers
        </Link>
        <Link to={`/followings?username=${pageUser}`}>
          Following
        </Link>
      </TitleWrapper>
      <section className="p-2">
        {followers.length && <FollowersView followersData={followers} />}
      </section>
    </Wrapper>
  );
}
