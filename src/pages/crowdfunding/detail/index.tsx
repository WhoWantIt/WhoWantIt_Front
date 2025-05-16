import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import BookmarkIcon from "../../../assets/bookmark.svg";
import BookMarkColor from "../../../assets/volunteer/bookmark_color.svg";
import ShareIcon from "../../../assets/share.svg";
import api from "../../../utils/api";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken") || "";

  // 1) 상세 데이터 불러오기
  useEffect(() => {
    setLoading(true);
    api
      .get(`/fundings/${fundingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          setFunding(res.data.result);
        } else {
          console.error("Error fetching funding detail:", res.data.message);
        }
      })
      .catch((err) => console.error("Error fetching funding detail:", err))
      .finally(() => setLoading(false));
  }, [fundingId, token]);

  // 2) 스크랩 추가/삭제
  const handleMark = () => {
    setIsScraped(true);
    api
      .post(`/fundings/scraps/${fundingId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => console.error("Error posting scrap:", err));
  };
  const handleDeleteMark = () => {
    setIsScraped(false);
    api
      .post(`/fundings/scraps/${fundingId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => console.error("Error deleting scrap:", err));
  };

  // 3) 카카오페이 요청
  const handleKakaoPay = () => {
    api
      .post(`/fundings/pays/${fundingId}?paymentAmount=100000`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          const url = res.data.result.next_redirect_pc_url;
          url
            ? (window.location.href = url)
            : console.error("redirect url 없음");
        }
      })
      .catch((err) => console.error("Error requesting KakaoPay:", err));
  };

  // 4) 카카오페이 승인 콜백
  useEffect(() => {
    const pg_token = searchParams.get("pg_token");
    if (!pg_token) return;
    api
      .post(`/fundings/success/${fundingId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          navigate(`/crowdfunding/detail/${fundingId}`);
        } else {
          alert("카카오 페이 승인 실패");
        }
      })
      .catch((err) => console.error("Error on KakaoPay success:", err));
  }, [searchParams, navigate, fundingId, token]);

  // 5) 로딩 중 또는 데이터 없음 처리
  if (loading) {
    return (
      <>
        <Navigation />
        <PageContainer>
          <Loading>로딩 중...</Loading>
        </PageContainer>
        <Footer />
      </>
    );
  }
  if (!funding) {
    return (
      <>
        <Navigation />
        <PageContainer>
          <Loading>펀딩 정보를 불러올 수 없습니다.</Loading>
        </PageContainer>
        <Footer />
      </>
    );
  }

  // 6) 실제 렌더링
  return (
    <>
      <Navigation />
      <PageContainer>
        <ContentWrapper>
          <ImageSection>
            <Image src={funding.attachedImage} alt={funding.title} />
          </ImageSection>

          <InfoSection>
            <Achievement>{funding.attainmentPercent}% 달성</Achievement>
            <TotalAmount>
              {funding.currentAmount.toLocaleString()}원 달성
            </TotalAmount>

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
      </PageContainer>
      <Footer />
    </>
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
  img {
    width: 48px;
    height: 48px;
  }
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
