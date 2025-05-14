import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import BookmarkIcon from "../../../assets/bookmark.svg";
import BookMarkColor from "../../../assets/volunteer/bookmark_color.svg";
import ShareIcon from "../../../assets/share.svg";
import axios from "axios";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

// API 주소를 환경변수로부터 가져옵니다
const Api = import.meta.env.VITE_API_URL;

interface FundingType {
  fundingId: number;
  title: string;
  content: string;
  status: string;
  productName: string;
  currentAmount: number;
  attachedImage: string;
  approvalStatus: string;
  attainmentPercent: number;
  beneficiaryId: number;
  beneficiaryName: string;
  beneficiaryNickname: string;
}

const CrowdfundingDetail: React.FC = () => {
  const { fundingId } = useParams<{ fundingId: string }>();
  const [funding, setFunding] = useState<FundingType | null>(null);
  const [isScraped, setIsScraped] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken") || "";

  // 펀딩 상세 데이터 가져오기
  useEffect(() => {
    axios
      .get(`${Api}fundings/${fundingId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setFunding(res.data.result))
      .catch(err => console.error("Error fetching funding detail:", err));
  }, [fundingId, token]);

  // 스크랩 처리
  const handleMark = () => {
    setIsScraped(true);
    axios
      .post(`${Api}fundings/scraps/${fundingId}`, null, { headers: { Authorization: `Bearer ${token}` } })
      .catch(err => console.error("Error posting scrap:", err));
  };

  const handleDeleteMark = () => {
    setIsScraped(false);
    axios
      .delete(`${Api}fundings/scraps/${fundingId}`, { headers: { Authorization: `Bearer ${token}` } })
      .catch(err => console.error("Error deleting scrap:", err));
  };

  // 카카오페이 요청
  const handleKakaoPay = () => {
    axios
      .post(`${Api}fundings/pays/${fundingId}?paymentAmount=100000`, null, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.data.isSuccess) {
          const url = res.data.result.next_redirect_pc_url;
          if (url) window.location.href = url;
        }
      })
      .catch(err => console.error("Error fetching KakaoPay:", err));
  };

  // 카카오페이 승인 콜백
  useEffect(() => {
    const pg_token = searchParams.get("pg_token");
    if (!pg_token) return;
    axios
      .post(`${Api}fundings/success/${fundingId}`, null, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.data.isSuccess) navigate(`/crowdfunding/detail/${fundingId}`);
        else alert("카카오 페이 승인 실패");
      })
      .catch(err => console.error("Error handling kakaoPay success:", err));
  }, [searchParams, navigate, fundingId, token]);

  if (!funding) {
    return (
      <PageContainer>
        <Navigation />
        <Loading>로딩 중...</Loading>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navigation />
      <ContentWrapper>
        <ImageSection>
          <Image src={funding.attachedImage} alt={funding.title} />
        </ImageSection>
        <InfoSection>
          <Achievement>{funding.attainmentPercent}% 달성</Achievement>
          <TotalAmount>{funding.currentAmount.toLocaleString()}원</TotalAmount>
          <TitleText>{funding.title}</TitleText>
          <BodyText>{funding.content}</BodyText>
          <Actions>
            <IconButton onClick={!isScraped ? handleMark : handleDeleteMark}>
              <img
                src={!isScraped ? BookmarkIcon : BookMarkColor}
                alt="스크랩"
              />
            </IconButton>
            <IconButton>
              <img src={ShareIcon} alt="공유" />
            </IconButton>
            <FundButton onClick={handleKakaoPay}>펀딩하기</FundButton>
          </Actions>
        </InfoSection>
      </ContentWrapper>
      <DetailsSection>
        <PlaceholderDetails />
      </DetailsSection>
      <Footer />
    </PageContainer>
  );
};

export default CrowdfundingDetail;

/** Styled Components **/
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const Loading = styled.div`
  padding: 40px;
  font-size: 1.2rem;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 30px;
`;
const ImageSection = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;
const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 12px;
`;
const Achievement = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #3e5879;
`;
const TotalAmount = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;
const TitleText = styled.h2`
  margin: 8px 0;
  font-size: 22px;
  color: #222;
`;
const BodyText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #555;
`;
const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img { width: 48px; height: 48px; }
`;
const FundButton = styled.button`
  padding: 8px 20px;
  background-color: #3e5879;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const DetailsSection = styled.div`
  width: 80%;
  margin: 40px 0;
`;
const PlaceholderDetails = styled.div`
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  border-radius: 8px;
`;
