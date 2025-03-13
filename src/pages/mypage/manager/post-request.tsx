//post
import { useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import { useEffect } from "react";
import api from "../../../utils/api";
// 기관 카드 데이터 예제
interface PostType {
  postId: number;
  title: string;
  beneficiaryId: number;
  beneficiaryName: string;
  beneficiaryNickname: string;
  approvalStatus: string;
  verified: boolean;
}
const ITEMS_PER_PAGE = 10;

const PostRequestPage = () => {
  const [documents] = useState<string[]>([
    "등록된 기관",
    "후원자 정보",
    "게시글 요청",
    "펀딩 요청",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [cards, setCards] = useState<PostType[]>([]);
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
      .get("/admins/posts")
      .then((res) => setCards(res.data.result.postList))
      .catch((err) => console.error("Error fetching cards:", err));
  });
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
            {currentCards.map((post, index) => (
              <Card key={index} isVerified={post.verified}>
                <CardTitle>{post.title}</CardTitle>
                <CardNickname>{post.beneficiaryNickname}</CardNickname>
                <CardStatus>
                  {post.verified ? "Verified" : "Not Verified"}
                </CardStatus>
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

const Card = styled.div<{ isVerified: boolean }>`
  width: clamp(140px, 18vw, 200px);
  height: clamp(80px, 12vw, 120px);
  padding: clamp(10px, 2vw, 20px);
  border-radius: 10px;
  background-color: ${(props) => (props.isVerified ? "#3e5879" : "#c0c7d6")};
  color: ${(props) => (props.isVerified ? "#ffffff" : "#000000")};
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.p`
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: bold;
`;

/* 페이지네이션 */
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const PageNumber = styled.div<{ active: boolean }>`
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
  color: #3e5879;

  &:hover {
    font-weight: bold;
  }
`;

const CardNickname = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
  margin-top: 5px;
`;
const CardStatus = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
  text-align: right;
  margin-top: auto;
  align-self: flex-end;
`;
