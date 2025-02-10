import { Route, Routes } from "react-router-dom";
import AllPosts from "../pages/posts/all";
import PostsByInstitution from "../pages/posts/institution";
import PostsByDate from "../pages/posts/date";
import SignupForm from "../pages/users/register";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/posts/:institution" element={<PostsByInstitution />} />
      <Route path="/posts/:year/:month" element={<PostsByDate />} />
      <Route path="/users/register" element={<SignupForm />} />
    </Routes>
  );
};

export default RoutesConfig;
