import { Route, Routes } from "react-router-dom";
import AllPosts from "../pages/posts/all";
import PostsByInstitution from "../pages/posts/institution";
import PostsByDate from "../pages/posts/date";
<<<<<<< HEAD
import SignupForm from "../pages/users/register";
import EditPage from "../pages/volunteer/edit";
import PostPage from "../pages/volunteer/post";
import HomePage from "../pages/volunteer/main";
=======
import LoginForm from "../pages/users/login";
>>>>>>> 2e8a90deecfefa28819a9148e93a2dc192efbe05

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignupForm />} />
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/posts/:institution" element={<PostsByInstitution />} />
      <Route path="/posts/:year/:month" element={<PostsByDate />} />
<<<<<<< HEAD
      <Route path="/volunteer/edit" element={<EditPage />} />
      <Route path="/volunteer/post" element={<PostPage />} />
      <Route path="/volunteer" element={<HomePage />} />
=======
      <Route path="/users/login" element={<LoginForm />} />
>>>>>>> 2e8a90deecfefa28819a9148e93a2dc192efbe05
    </Routes>
  );
};

export default RoutesConfig;
