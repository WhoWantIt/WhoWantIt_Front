//organ
import { useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import { useEffect } from "react";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
// 기관 카드 데이터 예제
const ITEMS_PER_PAGE = 10;
interface BeneType {
  attachedImage: string;
  nickname: string;
  name: string;
}
const BenePage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<BeneType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCards = cards.slice(startIndex, endIndex);
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const totalpages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  useEffect(() => {
    api
      .get("/admins/beneficiaries")
      .then((res) => setCards(res.data.result.beneficiaryList))
      .catch((err) => console.error("Error fetching cards:", err));
  });
  const documents = [
    { label: "등록된 기관", path: "manager/bene" },
    { label: "후원자 정보", path: "manager/spon" },
    { label: "게시글 요청", path: "manager/post-request" },
    { label: "펀딩 요청", path: "manager/funding" },
  ];
  const handleDetailCard = (beneficiaryId: number) => {
    navigate(`/bene/${beneficiaryId}`);
  };
  return (
    <>
      <Navigation />
      <Container>
        {/* 왼쪽 사이드바 */}
        <Wrapper>
        <Sidebar>
          <SidebarTitle>마이페이지</SidebarTitle>
          <DocumentList>
            {documents.map((doc, index) => (
              <DocumentItem
                key={index}
                active={window.location.pathname === doc.path}
                onClick={() => navigate(doc.path)}
              >
                {doc.label}
              </DocumentItem>
            ))}
          </DocumentList>
        </Sidebar>
        {/* 오른쪽 메인 콘텐츠 */}
        <MainContent>
          <Title>등록된 기관</Title>
          <TotalCount>
            <strong>100</strong> 개의 기관
          </TotalCount>
          <Divider />

          {/* 기관 카드 목록 */}
          <CardList>
            {currentCards.map((bene, index) => (
              <Card
                key={index}
                onClick={() => handleDetailCard(bene.beneficiaryId)}
              >
                <img src={bene.attachedImage} />
                <CardTitle>{bene.nickname}</CardTitle>
              </Card>
            ))}
          </CardList>

          {/* 페이지네이션 */}
          <Pagination>
            {Array.from({ length: totalpages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <PageNumber
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => handlePageClick(pageNumber)}
                >
                  {pageNumber}
                </PageNumber>
              )
            )}
          </Pagination>
        </MainContent>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default BenePage;

/* 스타일 정의 */
const Container = styled.div`
  display: fixed;
  width: 100%;
  font-family: Pretendard, sans-serif;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction:row;
  justify-center: flex-end;
  width: 100%;
`;
const Sidebar = styled.div`
  display: flex;
  width: 250px;
  background-color: #3e5879;
  color: white;
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
  display: fix;
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
  img {
    width: 200px;
    height: 150px;
    background-color: #c0c7d6;
    border-radius: 8px;
  }
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

const PageNumber = styled.div<{ active?: boolean }>`
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
  color: #3e5879;

  &:hover {
    font-weight: bold;
  }
`;
