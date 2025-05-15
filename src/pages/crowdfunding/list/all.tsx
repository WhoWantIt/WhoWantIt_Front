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
  currentAmount: number;
  beneficiaryId: number;
  beneficiaryName: string;
  beneficiaryNickname: string;
  dday: string;
}

const AllPosts: React.FC = () => {
  const navigate = useNavigate();
  const [fundings, setFundings] = useState<Funding[]>([]);
  const [currentPageType, setCurrentPageType] = useState<"all" | "ongoing" | "completed">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("accessToken") || "";

  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = "/fundings/lists";
    if (currentPageType === "ongoing") {
      url = "/fundings/filters?status=IN_PROGRESS";
    } else if (currentPageType === "completed") {
      url = "/fundings/filters?status=AFTER_PROGRESS";
    }

    api.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.data.isSuccess) {
          setFundings(res.data.result);
        } else {
          setError(res.data.message || "펀딩 목록을 불러올 수 없습니다.");
        }
      })
      .catch(err => {
        console.error(err);
        setError("서버 연결에 실패했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPageType, token]);

  const handleDetail = (fundingId: number) => {
    navigate(`/crowdfunding/detail/${fundingId}`);
  };

  return (
    <PageContainer>
      <Navigation />

      <HeroImage src={image} alt="크라우드 펀딩 배너" />

      <TabMenu>
        {(["all", "ongoing", "completed"] as const).map(type => (
          <TabItem
            key={type}
            $active={currentPageType === type}
            onClick={() => setCurrentPageType(type)}
          >
            {type === "all" ? "#전체" : type === "ongoing" ? "#진행 중인 펀딩" : "#완료된 펀딩"}
          </TabItem>
        ))}
      </TabMenu>

      {loading ? (
        <Message>Loading...</Message>
      ) : error ? (
        <Message>{error}</Message>
      ) : fundings.length === 0 ? (
        <Message>현재 {currentPageType === "all"
          ? "펀딩이 없습니다."
          : currentPageType === "ongoing"
          ? "진행 중인 펀딩이 없습니다."
          : "완료된 펀딩이 없습니다."}</Message>
      ) : (
        <PostGrid>
          {fundings.map(f => (
            <PostCard key={f.fundingId} onClick={() => handleDetail(f.fundingId)}>
              <PostImage src={f.attachedImage} alt={f.title} />
              <Achievement>
                {typeof f.currentAmount === "number"
                  ? f.currentAmount.toLocaleString()
                  : "0"}
                원 모금
              </Achievement>
              <CardTitle>{f.title}</CardTitle>
              <PostDetails>
                <Institution>{f.beneficiaryName}</Institution>
                <DaysLeft>{f.dday}일 남음</DaysLeft>
              </PostDetails>
            </PostCard>
          ))}
        </PostGrid>
      )}

      <Footer />
    </PageContainer>
  );
};

export default AllPosts;


/** Styled Components **/
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  margin: 60px 0 40px;
`;

const TabItem = styled.div<{ $active?: boolean }>`
  margin: 0 16px;
  padding-bottom: 8px;
  font-size: clamp(16px, 2vw, 28px);
  font-weight: bold;
  color: ${p => (p.$active ? "#3e5879" : "#e6d9d2")};
  border-bottom: ${p => (p.$active ? "3px solid #3e5879" : "1px solid #e6d9d2")};
  cursor: pointer;
`;

const Message = styled.p`
  text-align: center;
  margin: 40px 0;
  font-size: 1.2rem;
  color: #555;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  padding: 0 40px 60px;
`;

const PostCard = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const PostImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const Achievement = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
`;

const CardTitle = styled.h3`
  margin: 4px 0 8px;
  font-size: 14px;
  font-weight: 600;
`;

const PostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6c6c6c;
`;

const Institution = styled.div`
  font-weight: 500;
`;

const DaysLeft = styled.div`
  font-weight: bold;
  color: #3e5879;
`;
