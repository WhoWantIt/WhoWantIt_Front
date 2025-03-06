//fund
import { useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";

// 메인 컴포넌트
const SponserFundingPage = () => {
  //const api = import.meta.env.VITE_API_URL;
  const [documents] = useState<string[]>([
    "스크랩",
    "참여한 펀딩",
    "참여한 봉사",
    "개인정보 수정",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <Container>
        {/* 왼쪽 사이드바 */}
        <Sidebar>
          <ButtonWrapper>마이페이지</ButtonWrapper>
          <DocumentList>
            {documents.map((doc, index) => (
              <DocumentItem
                key={index}
                active={activeDoc === doc}
                onClick={() => setActiveDoc(doc)}
              >
                {doc}
              </DocumentItem>
            ))}
          </DocumentList>
        </Sidebar>
        <MainContent>
          <Title>참여한 펀딩</Title>
          <TotalCount>
            <strong>10,000,000</strong>원 펀딩
          </TotalCount>
          <Divider />

          {/* 기관 카드 목록 */}
          <StyledPostGrid>
            {Array.from({ length: 8 }).map((_, index) => (
              <StyledPostCard key={index}>
                <StyledImagePlaceholder />
                <StyledAchievement>680% 달성</StyledAchievement>
                <StyledCardTitle>
                  자립준비청년들에게 사회로 나갈 준비를 도와주세요.
                </StyledCardTitle>
                <StyledPostDetails>
                  <StyledPostInstitution>자립복지원</StyledPostInstitution>
                  <StyledPostDaysLeft>30일 남음</StyledPostDaysLeft>
                </StyledPostDetails>
              </StyledPostCard>
            ))}
          </StyledPostGrid>
          {/**페이지네이션 */}
        </MainContent>
      </Container>
    </>
  );
};

export default SponserFundingPage;
// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;
const Sidebar = styled.div`
  width: 250px;
  background-color: #3e5879;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
`;
const DocumentList = styled.ul`
  list-style: none;
  border-bottom: 2px solid #ffffff;
  padding: 0;
  margin-top: 100px;
  width: 250px;
`;
interface DocumentItemProps {
  active: boolean;
}

const DocumentItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<DocumentItemProps>`
  background-color: ${({ active }) => (active ? "#3e5879" : "#3e5879")};
  cursor: pointer;
  &:hover {
    background-color: #adacc2;
  }
  border-top: 2px solid white;
  height: 55px;
`;
/* 메인 콘텐츠 */
const MainContent = styled.div`
  flex: 1;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const TotalCount = styled.p`
  text-align: right;
  font-size: 18px;
  margin: 10px 0;
  color: #3e5879;

  strong {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;
const StyledPostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  padding: 30px 80px;
`;

const StyledPostCard = styled.div`
  background-color: white;
  padding: 16px;
`;

const StyledImagePlaceholder = styled.div`
  width: 100%;
  height: 150px;
  background-color: #c0c7d6;
  border-radius: 8px;
`;

const StyledAchievement = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
`;

const StyledCardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const StyledPostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6c6c6c;
`;

const StyledPostInstitution = styled.div`
  font-weight: 500;
`;

const StyledPostDaysLeft = styled.div`
  font-weight: bold;
  color: #3e5879;
`;
