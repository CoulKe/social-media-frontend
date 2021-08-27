import { lazy } from "react";

// Layouts
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const EmptyLayout = lazy(() => import("../layouts/EmptyLayout"));

// Pages
const Chats = lazy(() => import("../pages/Messages"));
const Profile = lazy(() => import("../pages/Profile"));
const EditProfile = lazy(() => import("../pages/Profile/edit"));
const PostEdit = lazy(() => import("../pages/EditPost"));
const CommentEdit = lazy(() => import("../pages/CommentEdit"));
const ComposeMessage = lazy(() => import("../pages/Messages/compose"));
const Notifications = lazy(() => import("../pages/Notifications"));

const AuthPages = [
  {
    path: "/messages",
    page: Chats,
    layout: MainLayout,
  },
  {
    path: "/messages/:recipient",
    page: ComposeMessage,
    layout: EmptyLayout,
  },
  {
    path: "/notifications",
    page: Notifications,
    layout: MainLayout,
  },
  {
    path: "/profile",
    page: Profile,
    layout: MainLayout,
  },
  {
    path: "/edit-profile",
    page: EditProfile,
    layout: MainLayout,
  },
  {
    path: "/edit-post",
    page: PostEdit,
    layout: MainLayout,
  },
  {
    path: "/edit-comment",
    page: CommentEdit,
    layout: MainLayout,
  },
];

export default AuthPages;
