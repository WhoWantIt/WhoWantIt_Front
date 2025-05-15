// src/pages/crowdfunding/all.tsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import image from "../../../assets/just2_image.svg";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";

interface Funding {
  fundingId: number;
  title: string;
  attachedImage: string;
  fundingAmount: number;
  beneficiaryId: number;
  beneficiaryName: string;
  beneficiaryNickname: string;
  dday: string;
}

const AllPosts: React.FC = () => {
  const navigate = useNavigate();
  const [fundings, setFundings] = useState<Funding[]>([]);
  const [currentPageType, setCurrentPageType] = useState<
    "all" | "ongoing" | "completed"
  >("all");
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken") || "";

  useEffect(() => {
    setLoading(true);
    let url = `/fundings/lists`;
    if (currentPageType === "ongoing") {
      url = `/fundings/filters?status=IN_PROGRESS`;
    } else if (currentPageType === "completed") {
      url = `/fundings/filters?status=AFTER_PROGRESS`;
    }

    api
      .get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          setFundings(res.data.result);
        }
      })
      .catch((err) => console.error("Error fetching fundings:", err))
      .finally(() => setLoading(false));
  }, [currentPageType, accessToken]);

  const handleDetail = (fundingId: number) => {
    navigate(`/crowdfunding/detail/${fundingId}`);
  };

  return (
    <StyledPageContainer>
      <Navigation />
      <StyledHeroImage src={image} />

      <TabMenu>
        <TabItem
          $active={currentPageType === "all"}
          onClick={() => setCurrentPageType("all")}
        >
          #전체
        </TabItem>
        <TabItem
          $active={currentPageType === "ongoing"}
          onClick={() => setCurrentPageType("ongoing")}
        >
          #진행 중인 펀딩
        </TabItem>
        <TabItem
          $active={currentPageType === "completed"}
          onClick={() => setCurrentPageType("completed")}
        >
          #완료된 펀딩
        </TabItem>
      </TabMenu>

      {loading ? (
        <p>Loading...</p>
      ) : fundings.length > 0 ? (
        <StyledPostGrid>
          {fundings.map((f) => (
            <StyledPostCard
              key={f.fundingId}
              onClick={() => handleDetail(f.fundingId)}
            >
              <StyledImage src={f.attachedImage} alt={f.title} />
              <StyledAchievement>
                {f.fundingAmount.toLocaleString()}원 모금
              </StyledAchievement>
              <StyledCardTitle>{f.title}</StyledCardTitle>
              <StyledPostDetails>
                <StyledPostInstitution>
                  {f.beneficiaryName}
                </StyledPostInstitution>
                <StyledPostDaysLeft>{f.dday}일 남음</StyledPostDaysLeft>
              </StyledPostDetails>
            </StyledPostCard>
          ))}
        </StyledPostGrid>
      ) : (
        <p>현재 {currentPageType === "completed" ? "완료된" : currentPageType === "ongoing" ? "진행 중인" : "전체"} 펀딩이 없습니다.</p>
      )}

      <Footer />
    </StyledPageContainer>
  );
};

export default AllPosts;


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
`;

const TabItem = styled.div<{ $active?: boolean }>`
  width: 300px;
  text-align: center;
  font-size: clamp(16px, 2vw, 30px);
  font-weight: bold;
  padding-bottom: 10px;
  color: ${(props) => (props.$active ? "#3e5879" : "#e6d9d2")};
  border-bottom: ${(props) =>
    props.$active ? "3px solid #3e5879" : "1px solid #e6d9d2"};
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
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
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
