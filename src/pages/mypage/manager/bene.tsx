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
  const [documents] = useState<string[]>([
    "등록된 기관",
    "후원자 정보",
    "게시글 요청",
    "펀딩 요청",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
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
  const handleNavigation = (doc: string) => {
    setActiveDoc(doc);
    const routes: { [key: string]: string } = {
      "등록된 기관": "/manager/bene",
      "후원자 정보": "/manager/spon",
      "게시글 요청": "/manager/post-request",
      "펀딩 요청": "/manager/funding",
    };
    navigate(routes[doc]);
  };
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
                active={activeDoc === doc}
                onClick={() => handleNavigation(doc)}
              >
                {doc}
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
              ),
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
  flex-direction : row;
  width: 100%;
`;
const Sidebar = styled.div`
  display: flex;
  background-color: #3e5879;
  width: 250px;
  heightL: 100vh;
  color: white;
  flex-direction: column;
  align-items: center;
  @media(max-width: 768px) {
    width: 200px;
  }
`;

const SidebarTitle = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 25px;
  @media(max-width: 768px) {
    font-size: 20px;
  }
`;

const DocumentList = styled.ul`
  list-style: none;
  border-bottom: 1px solid #ffffff;
  padding: 0;
  margin-top: 50px;
  width: 100%;
`;

interface DocumentItemProps {
  active: boolean;
}

const DocumentItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<DocumentItemProps>`
  padding: 15px 20px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#adacc2" : "#3d5879")};

  &:hover {
    background-color: #adacc2;
  }
  border-top: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  @media(max-width: 768px) {
    font-size: 15px;
  }
`;

/* 메인 콘텐츠 */
const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  min-width: 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 21px;
  }
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
  @media(max-width: 768px) {
    font-size: 15px;
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
  width: 100%;
  margin-top: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  width: 200px;
  height: 200px; {/*240*/}
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px; {/*12*/}
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    background: #ffffff;
  }
  img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    background-color: #c0c7d6;
    border-radius: 8px;
  }
`;


const CardTitle = styled.div`
  margin-top: 10px;
  font-size: 15px;
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
