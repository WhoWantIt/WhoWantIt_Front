import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import BookmarkIcon from "../../../assets/bookmark.svg";
import BookMarkColor from "../../../assets/volunteer/bookmark_color.svg";
import ShareIcon from "../../../assets/share.svg";
import api from "../../../utils/api";  // utils/api로 정확한 경로 수정
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

interface FundingType {
  funding: number;
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
  const [fundings, setFundings] = useState<FundingType | null>(null);
  const [isScraped, setIsScraped] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get<AxiosResponse<{ result: FundingType }>>(`/fundings/${fundingId}`)
      .then((res: any) => {
        setFundings(res.data.result);
      })
      .catch((err: any) => console.error("Error fetching funding detail:", err));
  }, [fundingId]);

  const handleMark = () => {
    setIsScraped(true);
    api.post(`/fundings/scraps/${fundingId}`)
      .catch((err: any) => console.error("Error posting scrap:", err));
  };

  const handleDeleteMark = () => {
    setIsScraped(false);
    api.post(`/fundings/scraps/${fundingId}`)
      .catch((err: any) => console.error("Error deleting scrap:", err));
  };

  const handleKakaoPay = () => {
    api
      .post<AxiosResponse<any>>(`/fundings/pays/${fundingId}?paymentAmount=100000`)
      .then((res: any) => {
        if (res.data.isSuccess) {
          const redirectUrl = res.data.result.next_redirect_pc_url;
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            console.error("결제 요청 응답에서 url이 존재하지 않습니다.");
          }
        } else {
          api.get<AxiosResponse<any>>("/fundings/cancel")
            .then((res: any) => alert(res.data.result));
        }
      })
      .catch((err: any) => console.error("Error fetching KakaoPay:", err));
  };

  useEffect(() => {
    const pg_token = searchParams.get("pg_token");
    if (!pg_token) return;
    api.post<AxiosResponse<any>>(`/fundings/success/${fundingId}`)
      .then((res: any) => {
        if (res.data.isSuccess) {
          navigate(`/crowdfunding/detail/${fundingId}`);
        } else {
          alert("카카오 페이 승인 실패");
        }
      })
      .catch((err: any) => console.error("Error handling kakaoPay success:", err));
  }, [searchParams, navigate, fundingId]);

  // 로딩 전 또는 데이터 없을 때 표시
  if (!fundings) {
    return (
      <PageContainer>
        <Navigation />
        <LoadingText>로딩 중...</LoadingText>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navigation />
      <ContentWrapper>
        <ImageSection>
          <PlaceholderImage />
        </ImageSection>
        <InfoSection>
          <Achievement>{fundings.attainmentPercent} 달성</Achievement>
          <TotalAmount>{fundings.currentAmount.toLocaleString()}원 달성</TotalAmount>
          <Actions>
            <IconButton onClick={!isScraped ? handleMark : handleDeleteMark}>
              {!isScraped ? (
                <img src={BookmarkIcon} alt="스크랩" />
              ) : (
                <img src={BookMarkColor} alt="스크랩 취소" />
              )}
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

const LoadingText = styled.p`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0 16px;
  }
`;

const ImageSection = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #3e5879;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 0;
  }
`;

const Achievement = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #3e5879;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const TotalAmount = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 6px;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 480px) {
    img {
      width: 36px;
      height: 36px;
    }
  }
`;

const FundButton = styled.button`
  padding: 5px 70px;
  background-color: #3e5879;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 480px) {
    padding: 8px 32px;
    font-size: 14px;
  }
`;

const DetailsSection = styled.div`
  width: 80%;
  height: 500px;
  background-color: #f0f0f0;
  margin-top: 40px;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 16px;
    margin-top: 24px;
  }
`;

const PlaceholderDetails = styled.div`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    -45deg,
    #ddd,
    #ddd 10px,
    #ccc 10px,
    #ccc 20px
  );
  border-radius: 8px;
`;
