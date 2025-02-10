import { Route, Routes } from "react-router-dom";
import AllPosts from "../pages/posts/all";
import PostsByInstitution from "../pages/posts/institution";
import PostsByDate from "../pages/posts/date";
import HomePage from "../pages/volunteer/main";
import PostPage from "../pages/volunteer/post";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/posts/:institution" element={<PostsByInstitution />} />
      <Route path="/posts/:year/:month" element={<PostsByDate />} />
      <Route path="/volunteer" element={<HomePage />} />
      <Route path="/volunteer/post" element={<PostPage />} />
    </Routes>
  );
};

export default RoutesConfig;
