import styled from "styled-components";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import BookmarkIcon from "../../../assets/bookmark.svg";
import BookMarkColor from "../../../assets/volunteer/bookmark_color.svg";
import ShareIcon from "../../../assets/share.svg";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
const CrowdfundingDetail = () => {
  const { fundingId } = useParams<{ fundingId: string }>();
  const [fundings, setFundings] = useState<FundingType>();
  const [isSrcaped, setIsSrcaped] = useState<boolean>();
  //const [paymentAmount, setPaymentAmount] = useState<number>(100000);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    api
      // 클라우드 펀딩 상세 조회
      .get(`/fundings/${fundingId}`)
      .then((res) => setFundings(res.data.result))
      .catch((err) => console.error("Error fetching funding detail: ", err));
  }, [fundingId]);
  const handleMark = () => {
    setIsSrcaped(true);
    api
      .post(`/fundings/scraps/${fundingId}`)
      .catch((err) => console.error("Error fetching scrap: ", err));
  };
  const handleDeleteMark = () => {
    setIsSrcaped(false);
    api
      .post(`/fundings/scraps/${fundingId}`)
      .catch((err) => console.error("Eror fetching delete scrap: ", err));
  };
  // paymentAmount 값 파라미터
  // 카카오페이 
  const handleKakaoPay = () => {
    api
      .post(`/fundings/pays/${fundingId}`, null, {
        params: { paymentAmount: 5000 },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          const redirectUrl = res.data.result.next_redirect_pc_url;
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            console.error("결제 요청 응답에서 url이 존재하지 않습니다.");
            api.get("/funding/cancel").then((res) => alert(res.data.result));
          }
        } else {
          api.get("/funding/fail").then((res) => alert(res.data.result));
        }
      })
      .catch((err) => {
        console.error("Error fetching KakaoPay: ", err);
      });
  };

  // 카카오페이 결제 성공
  //pg_token 파라미터로
  useEffect(() => {
    const pg_token = searchParams.get("pg_token");
    if (!pg_token) return;
    const handleKakaoPaySuccess = () => {
      api
        .post(`/fundings/success/`, null, {
          params: { pg_token },
        })
        .then((res) => {
          if (res.data.isSuccess) {
            navigate("/funding/success")
          } else {
            alert("카카오 페이 승인 실패");
          }
        })
        .catch((err) => console.error("Error fetching kakaoPay Success", err));
    };
    handleKakaoPaySuccess();
  }, [searchParams, navigate, fundingId]);
  return (
    <>
      <Navigation />
      <PageContainer>
        <ContentWrapper>
          <ImageSection>
            <PlaceholderImage />
          </ImageSection>
          <InfoSection>
            <Achievement>{fundings?.attainmentPercent} 달성</Achievement>
            <TotalAmount>{fundings?.currentAmount}원 달성</TotalAmount>
            <Actions>
              <IconButton onClick={!isSrcaped ? handleMark : handleDeleteMark}>
                {!isSrcaped ? (
                  <img src={BookmarkIcon} />
                ) : (
                  <img src={BookMarkColor} />
                )}
              </IconButton>
              <IconButton>
                <img src={ShareIcon} alt="공유" />
              </IconButton>
              <FundButton onClick={() => handleKakaoPay()}>펀딩하기</FundButton>
            </Actions>
          </InfoSection>
        </ContentWrapper>
        <DetailsSection>
          <PlaceholderDetails />
        </DetailsSection>
        <Footer />
      </PageContainer>
    </>
  );
};

export default CrowdfundingDetail;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
`;

const Achievement = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #3e5879;
`;

const TotalAmount = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 10px;
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
  padding: 5px 70px;
  background-color: #3e5879;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const DetailsSection = styled.div`
  width: 80%;
  height: 500px;
  background-color: #f0f0f0;
  margin-top: 40px;
  border-radius: 8px;
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
