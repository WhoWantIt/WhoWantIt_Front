import { Route, Routes, Navigate } from "react-router-dom";
import AllPosts from "../pages/posts/all";
import Homepage from "../pages/home/homepage";
import PostsByInstitution from "../pages/posts/institution";
import PostsByDate from "../pages/posts/date";
import SignupForm from "../pages/users/register";
import EditPage from "../pages/volunteer/edit";
import PostPage from "../pages/volunteer/post";
import LoginForm from "../pages/users/login";
import CrowdFunding from "../pages/crowdfunding/list/all";
import BenePage from "../pages/mypage/manager/bene";
import FundingPage from "../pages/mypage/manager/funding";
import PostRequestPage from "../pages/mypage/manager/post-request";
import PostEdit from "../pages/posts/edit";
import SponserFundingPage from "../pages/mypage/sponser/funding";
import PersonalEditPage from "../pages/mypage/sponser/personal-edit";
import BeneficiaryProfile from "../pages/mypage/beneficiary/profile";
import AnnouncementList from "../pages/mypage/beneficiary/announce";
import FundingHistory from "../pages/mypage/beneficiary/funding";
import PostHistory from "../pages/mypage/beneficiary/post";
import PersonalEdit from "../pages/mypage/beneficiary/personal-edit";
import BeneficiaryMain from "../pages/mypage/beneficiary";
import CrowdfundingDetail from "../pages/crowdfunding/detail/index";
import VolunteerPage from "../pages/volunteer/main";
import SponPage from "../pages/mypage/manager/spon";
import PostDetail from "../pages/posts/detail";
import PostRequestDetail from "../pages/mypage/manager/approve-post";
import FundingDetailPage from "../pages/mypage/manager/approve-funding";
import PersonalPage from "../pages/mypage/sponser/mypage";
import SponserVolunteerPage from "../pages/mypage/sponser/volunteer";
import FundingScrapPage from "../pages/mypage/sponser/fundingScrap";
import VolunteerScrapPage from "../pages/mypage/sponser/volunteerScrap";
const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignupForm />} />
      <Route path="/home/homepage" element={<Homepage />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/posts" element={<AllPosts />} />
      <Route path="/posts/:postId" element={<PostDetail />} />
      <Route
        path="/posts/institution/:institution"
        element={<PostsByInstitution />}
      />
      <Route path="/posts/date/:year/:month" element={<PostsByDate />} />
      <Route path="/posts/edit" element={<PostEdit />} />
      <Route path="/volunteer/edit" element={<EditPage />} />
      <Route path="/volunteer/post/:volunteerId" element={<PostPage />} />
      <Route path="/users/login" element={<LoginForm />} />
      <Route path="/crowdfunding/all" element={<CrowdFunding />} />
      <Route
        path="/crowdfunding/detail/:fundingId"
        element={<CrowdfundingDetail />}
      />
      <Route path="/volunteer" element={<VolunteerPage />} />
      <Route path="/manager/bene" element={<BenePage />} />
      <Route path="/manager/spon" element={<SponPage />} />
      <Route path="/manager/funding" element={<FundingPage />} />
      <Route path="/manager/post-request" element={<PostRequestPage />} />

      <Route path="/mypage/beneficiary" element={<BeneficiaryMain />}>
        <Route index element={<Navigate replace to="profile" />} />
        <Route path="profile" element={<BeneficiaryProfile />} />
        <Route path="announce" element={<AnnouncementList />} />
        <Route path="funding" element={<FundingHistory />} />
        <Route path="post" element={<PostHistory />} />
        <Route path="personal-edit" element={<PersonalEdit />} />
      </Route>

      <Route path="/sponser/funding" element={<SponserFundingPage />} />
      <Route path="/sponser/volunteer" element={<SponserVolunteerPage />} />
      <Route path="/sponser/personal-edit" element={<PersonalEditPage />} />
      <Route path="/posts/detail/:postId" element={<PostRequestDetail />} />
      <Route
        path="/fundings/detail/:fundingId"
        element={<FundingDetailPage />}
      />
      <Route path="/sponser/mypage" element={<PersonalPage />} />
      <Route path="/sponser/scrap/funding" element={<FundingScrapPage />} />
      <Route path="/sponser/scrap/volunteer" element={<VolunteerScrapPage />} />
    </Routes>
  );
};

export default RoutesConfig;
