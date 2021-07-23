import MainLayout from "../layouts/MainLayout";
import Chats from "../pages/Messages";
import Profile from "../pages/Profile";
import EditProfile from "../pages/Profile/edit";
import PostEdit from "../pages/EditPost";
import CommentEdit from "../pages/CommentEdit";
import ComposeMessage from "../pages/Messages/compose";
import Notifications from "../pages/Notifications";

const AuthPages = [
    {
    path: "/messages",
    page: Chats,
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
  {
    path: "/messages/:recipient",
    page: ComposeMessage,
    layout: MainLayout,
  },
  {
    path: "/notifications",
    page: Notifications,
    layout: MainLayout,
  },
];

export default AuthPages;
