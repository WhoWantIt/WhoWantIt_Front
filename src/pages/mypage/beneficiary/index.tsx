import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigation from "../../../components/Navigation";
import styled from 'styled-components';

const BeneficiaryMain = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { label: '프로필', path: '/mypage/beneficiary/profile' },
    { label: '공고현황', path: '/mypage/beneficiary/announce' },
    { label: '게시글 내역', path: '/mypage/beneficiary/post' },
    { label: '펀딩 내역', path: '/mypage/beneficiary/funding' },
    { label: '개인정보 수정', path: '/mypage/beneficiary/personal-edit' },
  ];

  return (
    <Wrapper>
      <NavigationWrapper>
        <Navigation />
      </NavigationWrapper>
      <PageWrapper>
        <Sidebar>
          <SidebarTitle>마이페이지</SidebarTitle>
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </SidebarItem>
          ))}
        </Sidebar>
        <ContentArea>
          <Outlet />
        </ContentArea>
      </PageWrapper>
    </Wrapper>
  );
};

export default BeneficiaryMain;


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  font-family: Pretendard, sans-serif; 
`;


const NavigationWrapper = styled.div`
  height: 60px; 
  flex-shrink: 0;
`;

const PageWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #3e5879;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  box-sizing: border-box;
`;

const SidebarTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const SidebarItem = styled.div<{ active: boolean }>`
  font-size: 18px;
  padding: 15px 0;
  cursor: pointer;
  color: ${(props) => (props.active ? 'white' : '#b0c4de')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  &:hover {
    color: white;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  background-color: #f8f9fa;
  padding: 40px;
  overflow-y: auto;
  box-sizing: border-box;
`;
