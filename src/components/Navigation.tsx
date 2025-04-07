import styled from "styled-components";
import Logo from "../assets/home/logo_full.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserRole } from "../utils/jwt";
const HeaderBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 20px;
  background-color: #ffffff;
  font-family: Pretendard, sans-serif;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 15px;
`;

const LogoImage = styled.img`
  width: auto;
  height: 40px;
`;

const HeaderMenu = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.button`
  margin-right: 20px;
  font-size: 15px;
  color: #3e5879;
  font-weight: regular;
  cursor: pointer;
  border: none;
  background-color: #ffffff;
`;

const HeaderButtons = styled.div`
  display: flex;
  margin-left: auto;
`;

const LoginButton = styled.button`
  background-color: transparent;
  border: 1.3px solid #3e5879;
  border-radius: 5px;
  color: #3e5879;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
  padding: 8px 16px;
  width: 120px;
`;

const SignupButton = styled.button`
  background-color: #3e5879;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 8px 16px;
  margin-right: 30px;
  width: 120px;
`;
const UserEmail = styled.button`
  font-size: 15px;
  color: #3e5879;
  margin-right: 20px;
  margin-top: 3px;
  border: none;
  background-color: #ffffff;
`;

const LogoutButton = styled.button`
  background-color: #3e5879;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 8px 16px;
  margin-bottom: 3px;
  width: 100px;
`;
const Navigation = () => {
  const role = getUserRole();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email);
  }, []);

  const handleLogin = () => {
    navigate("/users/login");
  };
  const handleSignIn = () => {
    navigate("/sign-up");
  };
  const handleMypage = () => {
    if (role === "ADMIN") {
      navigate("/manager/bene");
    } else if (role === "BENEFICIARY") {
      navigate("/beneficiary/mypage")
      
    } else if (role === "SPONSOR") {
      navigate("/sponser/mypage");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    setUserEmail(null);
    window.location.reload(); // 새로고침하여 네비게이션 업데이트
  };
  const handlePosts = () => {
    navigate("/posts");
  };
  const handleVolunteer = () => {
    navigate("/volunteer");
  };
  const handleFunding = () => {
    navigate("/crowdfunding/all");
  };
  return (
    <HeaderBar>
      <LogoLink to="/">
        <LogoImage src={Logo} />
      </LogoLink>
      <HeaderMenu>
        <MenuItem onClick={handlePosts}>게시글</MenuItem>
        <MenuItem onClick={handleVolunteer}>자원봉사</MenuItem>
        <MenuItem onClick={handleFunding}>크라우드 펀딩</MenuItem>
      </HeaderMenu>
      <HeaderButtons>
        {userEmail ? (
          <>
            <UserEmail onClick={handleMypage}>{userEmail}님</UserEmail>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
            <SignupButton onClick={handleSignIn}>회원가입</SignupButton>
          </>
        )}
      </HeaderButtons>
    </HeaderBar>
  );
};

export default Navigation;
