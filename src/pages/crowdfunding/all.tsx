import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import image from "../../assets/just2_image.svg";

const ITEMS_PER_PAGE = 8;

const AllPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageType, setCurrentPageType] = useState<'all' | 'ongoing' | 'completed'>('all');

  return (
    <StyledPageContainer>
      <Navigation />
      <StyledHeroImage src={image} />

      <TabMenu>
        <TabItem $active={currentPageType === 'all'} onClick={() => setCurrentPageType('all')}>
          #전체
        </TabItem>
        <TabItem $greyed={true} onClick={() => setCurrentPageType('ongoing')}>
          #진행 중인 펀딩
        </TabItem>
        <TabItem $greyed={true} onClick={() => setCurrentPageType('completed')}>
          #완료된 펀딩
        </TabItem>
      </TabMenu>

      <StyledPostGrid>
        {Array.from({ length: 8 }).map((_, index) => (
          <StyledPostCard key={index}>
            <StyledImagePlaceholder />
            <StyledAchievement>680% 달성</StyledAchievement>
            <StyledCardTitle>자립준비청년들에게 사회로 나갈 준비를 도와주세요.</StyledCardTitle>
            <StyledPostDetails>
              <StyledPostInstitution>자립복지원</StyledPostInstitution>
              <StyledPostDaysLeft>30일 남음</StyledPostDaysLeft>
            </StyledPostDetails>
          </StyledPostCard>
        ))}
      </StyledPostGrid>

      <StyledPagination>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((pageNumber) => (
          <StyledPageNumber key={pageNumber} $active={pageNumber === currentPage} onClick={() => setCurrentPage(pageNumber)}>
            {pageNumber}
          </StyledPageNumber>
        ))}
      </StyledPagination>
      <Footer />
    </StyledPageContainer>
  );
};

export default AllPosts;

// Styled Components (with corrected prop passing)
const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeroImage = styled.img`
  width: 100%;
  height: auto;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  margin: 100px 0 70px;
`;

const TabItem = styled.div<{ $active?: boolean; $greyed?: boolean }>`
  width: 300px;
  text-align: center;
  font-size: clamp(16px, 2vw, 30px);
  font-weight: bold;
  padding-bottom: 10px;
  color: ${(props) => (props.$active ? '#3e5879' : props.$greyed ? '#e6d9d2' : '#000')};
  border-bottom: ${(props) => (props.$active ? '3px solid #3e5879' : '1px solid #e6d9d2')};
  cursor: pointer;
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
  border-radius: 12px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
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

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const StyledPageNumber = styled.div<{ $active?: boolean }>`
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  color: ${(props) => (props.$active ? '#3e5879' : '#ccc')};
`;
