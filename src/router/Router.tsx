import { Route, Routes } from "react-router-dom";
import AllPosts from "../pages/posts/all";
import Homepage from "../pages/home/homepage";
import PostsByInstitution from "../pages/posts/institution";
import PostsByDate from "../pages/posts/date";
import SignupForm from "../pages/users/register";
import EditPage from "../pages/volunteer/edit";
import PostPage from "../pages/volunteer/post";
import LoginForm from "../pages/users/login";
import CrowdFunding from "../pages/crowdfunding/all";
import OrganPage from "../pages/mypage/manager/organ";
import BenePage from "../pages/mypage/manager/bene";
import FundingPage from "../pages/mypage/manager/funding";
import PostRequestPage from "../pages/mypage/manager/post-request";
import PostEdit from "../pages/posts/edit";
import SponserFundingPage from "../pages/mypage/sponser/funding";
import SponserAnnouncePage from "../pages/mypage/sponser/announce";
import PersonalEditPage from "../pages/mypage/sponser/personal-edit";
import VolunteerPage from "../pages/volunteer/main";
import ScrapPage from "../pages/mypage/sponser/scrap";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignupForm />} />
      <Route path="/home/homepage" element={<Homepage />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/posts/:institution" element={<PostsByInstitution />} />
      <Route path="/posts/:year/:month" element={<PostsByDate />} />
      <Route path="/posts/edit" element={<PostEdit />} />
      <Route path="/volunteer/edit" element={<EditPage />} />
      <Route path="/volunteer/post" element={<PostPage />} />
      <Route path="/users/login" element={<LoginForm />} />
      <Route path="/crowdfunding/all" element={<CrowdFunding />} />
      <Route path="/volunteer" element={<VolunteerPage />} />
      <Route path="/manager/organ" element={<OrganPage />} />
      <Route path="/manager/bene" element={<BenePage />} />
      <Route path="/manager/funding" element={<FundingPage />} />
      <Route path="/manager/post-request" element={<PostRequestPage />} />
      <Route path="/sponser/funding" element={<SponserFundingPage />} />
      <Route path="/sponser/announce" element={<SponserAnnouncePage />} />
      <Route path="/sponser/personal-edit" element={<PersonalEditPage />} />
      <Route path="/sponser/scrap" element={<ScrapPage />} />
    </Routes>
  );
};

export default RoutesConfig;
