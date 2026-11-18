import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import BlogLayout from "./components/BlogLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Overview from "./pages/admin/Overview";
import UserDetail from "./pages/admin/UserDetail";
import Users from "./pages/admin/Users";
import NotificationsTab from "./pages/admin/settings/NotificationsTab";
import ProfileTab from "./pages/admin/settings/ProfileTab";
import SecurityTab from "./pages/admin/settings/SecurityTab";
import SettingsLayout from "./pages/admin/settings/SettingsLayout";
import About from "./pages/blog/About";
import Categories from "./pages/blog/Categories";
import PostFeed from "./pages/blog/PostFeed";
import PostReader from "./pages/blog/PostReader";

// The whole route tree, declared in one place. Routes are matched by best fit, not by order.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Layout route: ProtectedRoute guards the shell, so every child below is protected too */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Overview />} />                       {/* /admin */}
        <Route path="users" element={<Users />} />                   {/* /admin/users?role=… */}
        <Route path="users/:userId" element={<UserDetail />} />      {/* dynamic segment */}
        <Route path="settings" element={<SettingsLayout />}>         {/* nested layout #2 */}
          <Route index element={<Navigate to="profile" replace />} />{/* /admin/settings → /profile */}
          <Route path="profile" element={<ProfileTab />} />
          <Route path="security" element={<SecurityTab />} />
          <Route path="notifications" element={<NotificationsTab />} />
        </Route>
      </Route>

      <Route path="/blog" element={<BlogLayout />}>
        <Route index element={<PostFeed />} />
        <Route path="category/:categorySlug" element={<PostFeed />} />
        <Route path="categories" element={<Categories />} />
        <Route path="post/:postSlug" element={<PostReader />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Wildcard: anything that matched nothing above */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
