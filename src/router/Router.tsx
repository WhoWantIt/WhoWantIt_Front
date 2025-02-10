import { Route, Routes } from "react-router-dom";
import AllPosts from "../pages/posts/all";
import PostsByInstitution from "../pages/posts/institution";
import PostsByDate from "../pages/posts/date";
import LoginForm from "../pages/users/login";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/posts/:institution" element={<PostsByInstitution />} />
      <Route path="/posts/:year/:month" element={<PostsByDate />} />
      <Route path="/users/login" element={<LoginForm />} />
    </Routes>
  );
};

export default RoutesConfig;
