//post
import { useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";

// 기관 카드 데이터 예제
const organizations = Array(9).fill({ name: "자연보호원" });

const PostRequestPage = () => {
  const [documents] = useState<string[]>([
    "등록된 기관",
    "후원자 정보",
    "게시글 요청",
    "펀딩 요청",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <Container>
        {/* 왼쪽 사이드바 */}
        <Sidebar>
          <SidebarTitle>마이페이지</SidebarTitle>
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

        {/* 오른쪽 메인 콘텐츠 */}
        <MainContent>
          <Title>게시글 요청</Title>
          <TotalCount>
            <strong>100</strong> 개의 기관
          </TotalCount>
          <Divider />

          {/* 기관 카드 목록 */}
          <CardList>
            {organizations.map((org, index) => (
              <Card key={index}>
                <CardImage />
                <CardTitle>{org.name}</CardTitle>
              </Card>
            ))}
          </CardList>

          {/* 페이지네이션 */}
          <Pagination>
            {[...Array(10)].map((_, index) => (
              <PageNumber key={index}>{index + 1}</PageNumber>
            ))}
          </Pagination>
        </MainContent>
      </Container>
      <Footer />
    </>
  );
};

export default PostRequestPage;

/* 스타일 정의 */
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  font-family: Pretendard, sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #3e5879;
  color: white;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

const SidebarTitle = styled.h3`
  text-align: center;
  margin-bottom: 30px;
`;

const DocumentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

interface DocumentItemProps {
  active: boolean;
}

const DocumentItem = styled.li<DocumentItemProps>`
  padding: 15px 20px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#adacc2" : "transparent")};
  border-bottom: 1px solid white;

  &:hover {
    background-color: #adacc2;
  }
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

/* 카드 목록 */
const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  width: 200px;
  height: 180px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  cursor: pointer;

  &:hover {
    background: #ffffff;
  }
`;

const CardImage = styled.div`
  width: 200px;
  height: 150px;
  background-color: #c0c7d6;
  border-radius: 8px;
`;

const CardTitle = styled.p`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  margin-right: 90px;
`;

/* 페이지네이션 */
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
  color: #3e5879;

  &:hover {
    font-weight: bold;
  }
`;
