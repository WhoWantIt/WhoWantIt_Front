import { Route, Routes } from "react-router-dom";
import AllPosts from "../pages/posts/all";
import PostsByInstitution from "../pages/posts/institution";
import PostsByDate from "../pages/posts/date";
import SignupForm from "../pages/users/register";
import EditPage from "../pages/volunteer/edit";
import PostPage from "../pages/volunteer/post";
import HomePage from "../pages/volunteer/main";
import LoginForm from "../pages/users/login";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignupForm />} />
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/posts/:institution" element={<PostsByInstitution />} />
      <Route path="/posts/:year/:month" element={<PostsByDate />} />
      <Route path="/volunteer/edit" element={<EditPage />} />
      <Route path="/volunteer/post" element={<PostPage />} />
      <Route path="/volunteer" element={<HomePage />} />
      <Route path="/users/login" element={<LoginForm />} />
    </Routes>
  );
};

export default RoutesConfig;
