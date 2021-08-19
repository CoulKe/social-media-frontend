import loginReducer from "./login";
import postsReducer from "./posts";
import profileReducers from "./profile";
import chatsReducer from "./chat";
import messagesReducer from "./messages";
import commentsReducer from "./comments";
import followersReducer from "./followers";
import followingsReducer from "./followings";
import notificationsReducer from "./notifications";
import hashtagsReducer from "./hashtags";
import searchReducer from "./search";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  login: loginReducer,
  posts: postsReducer,
  followers: followersReducer,
  followings: followingsReducer,
  comments: commentsReducer,
  profile: profileReducers,
  chats: chatsReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  hashtags: hashtagsReducer,
  search: searchReducer,
});

export default allReducers;
