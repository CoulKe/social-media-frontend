import { lazy } from "react";
// import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/";

// Dynamic layout
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));

// Dynamic page loads
const Hashtags = lazy(() => import("../pages/Hashtags"));
const FollowingsPage = lazy(() => import("../pages/Follows/followings"));
const FollowersPage = lazy(() => import("../pages/Follows/followers"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Comments = lazy(() => import("../pages/Comments"));
const Search = lazy(() => import("../pages/Search"));

const PublicPages = [
  {
    path: "/search",
    page: Search,
    layout: MainLayout,
  },
  {
    path: "/hashtags/:hashtag",
    page: Hashtags,
    layout: MainLayout,
  },
  {
    path: "/followings",
    page: FollowingsPage,
    layout: MainLayout,
  },
  {
    path: "/followers",
    page: FollowersPage,
    layout: MainLayout,
  },
  {
    path: "/login",
    page: Login,
    layout: AuthLayout,
  },
  {
    path: "/register",
    page: Register,
    layout: AuthLayout,
  },
  {
    path: "/",
    page: Home,
    layout: MainLayout,
  },
  {
    path: "/comments",
    page: Comments,
    layout: MainLayout,
  },
];

export default PublicPages;
