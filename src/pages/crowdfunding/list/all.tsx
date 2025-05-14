import styled from "styled-components";
import { useState, useEffect } from "react";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import image from "../../../assets/just2_image.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL;

interface Funding {
  fundingId: number;
  title: string;
  attachedImage: string;
  fundingAmount: number;
  beneficiaryName: string;
  dday: string;
}

const CrowdFunding: React.FC = () => {
  const navigate = useNavigate();
  const [fundings, setFundings] = useState<Funding[]>([]);
  const [currentPageType, setCurrentPageType] = useState<"all" | "ongoing" | "completed">("all");
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    setLoading(true);
    let apiUrl = `${API_BASE_URL}fundings/lists`;
    if (currentPageType === "ongoing") apiUrl = `${API_BASE_URL}fundings/filters?status=IN_PROGRESS`;
    if (currentPageType === "completed") apiUrl = `${API_BASE_URL}fundings/filters?status=AFTER_PROGRESS`;

    axios
      .get(apiUrl, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        if (response.data.isSuccess) setFundings(response.data.result);
      })
      .catch((error) => console.error("Error fetching fundings:", error))
      .finally(() => setLoading(false));
  }, [currentPageType]);

  const handleDetail = (fundingId: number) => navigate(`/crowdfunding/detail/${fundingId}`);

  return (
    <StyledPageContainer>
      <Navigation />
      <StyledHeroImage src={image} alt="Crowdfunding Hero" />

      <TabMenu>
        <TabItem $active={currentPageType === "all"} onClick={() => setCurrentPageType("all")}>#전체</TabItem>
        <TabItem $active={currentPageType === "ongoing"} onClick={() => setCurrentPageType("ongoing")}>#진행 중인 펀딩</TabItem>
        <TabItem $active={currentPageType === "completed"} onClick={() => setCurrentPageType("completed")}>#완료된 펀딩</TabItem>
      </TabMenu>

      {loading ? (
        <LoadingText>Loading...</LoadingText>
      ) : (
        <StyledPostGrid>
          {fundings.length > 0 ? (
            fundings.map((funding) => (
              <StyledPostCard key={funding.fundingId} onClick={() => handleDetail(funding.fundingId)}>
                <StyledImage src={funding.attachedImage} alt={funding.title} />
                <StyledAchievement>{funding.fundingAmount.toLocaleString()}원 모금</StyledAchievement>
                <StyledCardTitle>{funding.title}</StyledCardTitle>
                <StyledPostDetails>
                  <StyledPostInstitution>{funding.beneficiaryName}</StyledPostInstitution>
                  <StyledPostDaysLeft>{funding.dday}일 남음</StyledPostDaysLeft>
                </StyledPostDetails>
              </StyledPostCard>
            ))
          ) : (
            <LoadingText>현재 진행 중인 펀딩이 없습니다.</LoadingText>
          )}
        </StyledPostGrid>
      )}

      <Footer />
    </StyledPageContainer>
  );
};

export default CrowdFunding;

/** Styled Components **/
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
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin: 50px 0 40px;
  }
`;

const TabItem = styled.div<{ $active?: boolean }>`
  flex: 1 1 200px;
  text-align: center;
  font-size: clamp(16px, 2vw, 30px);
  font-weight: bold;
  padding: 10px;
  color: ${(p) => (p.$active ? "#3e5879" : "#e6d9d2")};
  border-bottom: ${(p) => (p.$active ? "3px solid #3e5879" : "1px solid #e6d9d2")};
  cursor: pointer;
`;

const LoadingText = styled.p`
  text-align: center;
  padding: 40px;
  font-size: 1rem;
`;

const StyledPostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  padding: 30px 80px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 20px 40px;
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 16px 24px;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 12px 16px;
    grid-gap: 16px;
  }
`;

const StyledPostCard = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    height: 120px;
  }
  @media (max-width: 480px) {
    height: 100px;
  }
`;

const StyledAchievement = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const StyledCardTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const StyledPostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6c6c6c;

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const StyledPostInstitution = styled.div`
  font-weight: 500;
`;

const StyledPostDaysLeft = styled.div`
  font-weight: bold;
  color: #3e5879;
`;
