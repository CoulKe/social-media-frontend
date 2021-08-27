import { lazy } from "react";

// Layouts
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const EmptyLayout = lazy(() => import("../layouts/EmptyLayout"));

// Pages
const Home = lazy(() => import("../pages/Home/"));
const Hashtags = lazy(() => import("../pages/Hashtags"));
const FollowingsPage = lazy(() => import("../pages/Follows/followings"));
const FollowersPage = lazy(() => import("../pages/Follows/followers"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Logout = lazy(() => import("../pages/Logout"));
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
    path: "/logout",
    page: Logout,
    layout: EmptyLayout,
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
