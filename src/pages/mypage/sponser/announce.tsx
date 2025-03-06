//fund
import { useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";

// 메인 컴포넌트
const SponserAnnouncePage = () => {
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
          <Title>참여한 봉사</Title>
          <TotalCount>
            <strong>10</strong>건의 봉사 참여
          </TotalCount>
          <Divider />

          {/* 기관 카드 목록 */}

          {/**페이지네이션 */}
        </MainContent>
      </Container>
    </>
  );
};

export default SponserAnnouncePage;
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
