import styled from "styled-components";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import ShareIcon from "../../../assets/share.svg";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useParams } from "react-router-dom";
/**target-amount  추가*/
interface FundType {
  fundingId: number;
  title: string;
  content: string;
  status: string;
  productName: string;
  target_amount: string;
  currentAmount: number;
  attachedImage: string;
  approvalStatus: string;
  attainmentPercent: number;
  beneficiaryId: number;
  beneficiaryName: string;
  beneficiaryNickname: string;
}
const FundingDetailPage = () => {
  const { fundingId } = useParams<{ fundingId: string }>();
  const [fundings, setFundings] = useState<FundType>();
  const [permission, setPermission] = useState<boolean>();
  useEffect(() => {
    api
      .get(`/fundings/${fundingId}`)
      .then((res) => setFundings(res.data.result))
      .catch((err) => console.error("Error fetching funding detail: ", err));
  }, [fundingId]);
  const handleVerify = () => {
    setPermission(true);
    api
      .get(`/fundings/approvals/${fundingId}?permission=${permission}`)
      .catch((err) => console.error("Error fetching funding approve: ", err));
  };
  const handleDelete = () => {
    setPermission(false);
    api
      .get(`/funding/approvals/${fundingId}?permission=${permission}`)
      .catch((err) =>
        console.error("Error fetching funding approve deny:", err),
      );
  };
  return (
    <>
      <Navigation />
      <PageContainer>
        <ContentWrapper>
          <ImageSection>
            <PlaceholderImage />
          </ImageSection>
          <InfoSection>
            <Title>{fundings?.title}</Title>
            <Achievement>{fundings?.target_amount}원 달성 목표</Achievement>
            <Actions>
              <IconButton>
                <img src={ShareIcon} alt="공유" />
              </IconButton>
              <FundButton onClick={() => handleVerify()}>승인하기</FundButton>
              <FundButton onClick={() => handleDelete()}>거절하기</FundButton>
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

export default FundingDetailPage;

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
const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;
const Achievement = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #3e5879;
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
