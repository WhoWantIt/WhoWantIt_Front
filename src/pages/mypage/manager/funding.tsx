//fund
import { useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";
import { useEffect } from "react";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
interface FundingType {
  fundingId: number;
  title: string;
  attachedImage: string;
  attainmentPercent: number;
  beneficiaryId: number;
  beneficiaryName: string;
  beneficiaryNickname: string;
  dday: string;
}
const ITEMS_PER_PAGE = 10;

// 메인 컴포넌트
const FundingPage = () => {
  const navigate = useNavigate();
  //const api = import.meta.env.VITE_API_URL;
  const [documents] = useState<string[]>([
    "등록된 기관",
    "후원자 정보",
    "게시글 요청",
    "펀딩 요청",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [cards, setCards] = useState<FundingType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCards = cards.slice(startIndex, endIndex);
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const totalpages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // 토큰 저장 방식 확인
        //console.log("토큰:", localStorage.getItem("accessToken"));
        const response = await api.get("/admins/fundings", {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰 포함
          },
        });
        setCards(response.data.result.fundingResponseList);
      } catch (err) {
        console.error("Error fetching cards:", err);
      }
    };
    fetchData();
  }, []);
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
  const handleApprovalFunding = (fundingId: number) => {
    navigate(`/fundings/detail/${fundingId}`);
  };
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
                onClick={() => handleNavigation(doc)}
              >
                {doc}
              </DocumentItem>
            ))}
          </DocumentList>
        </Sidebar>
        <MainContent>
          <Title>펀딩 요청</Title>
          <TotalCount>
            <strong>6</strong>개의 펀딩 요청
          </TotalCount>
          <Divider />

          {/* 기관 카드 목록 */}
          <StyledPostGrid>
            {currentCards.map((fund, index) => (
              <StyledPostCard
                key={index}
                onClick={() => handleApprovalFunding(fund.fundingId)}
              >
                <StyledImagePlaceholder />
                <StyledAchievement>
                  {fund.attainmentPercent}% 달성
                </StyledAchievement>
                <StyledCardTitle>{fund.title}</StyledCardTitle>
                <StyledPostDetails>
                  <StyledPostInstitution>
                    {fund.beneficiaryNickname}
                  </StyledPostInstitution>
                  <StyledPostDaysLeft>{fund.dday}일 남음</StyledPostDaysLeft>
                </StyledPostDetails>
              </StyledPostCard>
            ))}
          </StyledPostGrid>
          {/**페이지네이션 */}
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
    </>
  );
};

export default FundingPage;
// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  width: 100%;
  font-family: Pretendard, sans-serif;
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
const SidebarTitle = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 25px;
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
  background-color: ${({ active }) => (active ? "#adacc2" : "#3e5879")};
  cursor: pointer;
  &:hover {
    background-color:#adacc2;
  }
  border-top: 1px solid #ffffff;
  display: flex;
  align-items; center;
  justify-content: center;
  font-size: 18px;
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
