import styled from "styled-components";
import Logo from "../assets/home/logo_full.svg";
import { Link } from "react-router-dom";

const HeaderBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 20px;
  background-color: #ffffff;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  width: auto;
  height: 40px;
  margin-left: 30px;
  margin-right: 50px;
`;

const HeaderMenu = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-right: 20px;
  font-size: 15px;
  color: #3e5879;
  font-weight: regular;
  cursor: pointer;
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

const Navigation = () => {
  return (
    <HeaderBar>
      <LogoLink to="/posts">
        <LogoImage src={Logo} />
      </LogoLink>
      <HeaderMenu>
        <MenuItem>게시글</MenuItem>
        <MenuItem>자원봉사</MenuItem>
        <MenuItem>프로필</MenuItem>
      </HeaderMenu>
      <HeaderButtons>
        <LoginButton>로그인</LoginButton>
        <SignupButton>회원가입</SignupButton>
      </HeaderButtons>
    </HeaderBar>
  );
};

export default Navigation;
