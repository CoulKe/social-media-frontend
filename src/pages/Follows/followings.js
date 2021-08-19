import React, { useEffect } from "react";
import queryString from "query-string";
import { FollowingsView } from "../../Components/Follows";
import { Wrapper, TitleWrapper } from "./style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFollowings } from "../../actions/followsActions";
import Meta from "../../Components/Meta";

export default function FollowingsPage({location}) {
  const dispatch = useDispatch();

  const {followings} = useSelector(state => state.followings)

  let pageUser;

  if (location.search) {
    pageUser = queryString.parse(location.search).username;
  } else {
    pageUser = localStorage.getItem("loggedUser");
  }


  useEffect(() => {
      dispatch(getFollowings(pageUser))
  }, [dispatch, pageUser]);

  return (
    <Wrapper className="bg-white rounded">
    <Meta title="Following" />
      <TitleWrapper>
        <Link to={`/followers?username=${pageUser}`}>
          Followers
        </Link>
        <Link to={`/followings?username=${pageUser}`} className="active-border">
          Following
        </Link>
      </TitleWrapper>
      <section className="p-2">
        {followings.length && <FollowingsView followingsData={followings} />}
      </section>
    </Wrapper>
  );
}
