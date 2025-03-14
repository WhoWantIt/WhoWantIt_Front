import React from "react";
import styled from "styled-components";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import BookmarkIcon from "../../../assets/bookmark.svg";
import ShareIcon from "../../../assets/share.svg";

const CrowdfundingDetail = () => {
  return (
    <PageContainer>
      <Navigation />
      <ContentWrapper>
        <ImageSection>
          <PlaceholderImage />
        </ImageSection>
        <InfoSection>
          <Achievement>680% 달성</Achievement>
          <TotalAmount>13,426,230원 달성</TotalAmount>
          <Actions>
            <IconButton>
              <img src={BookmarkIcon} alt="북마크" />
            </IconButton>
            <IconButton>
              <img src={ShareIcon} alt="공유" />
            </IconButton>
            <FundButton>펀딩하기</FundButton>
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
  background-color: #ccc;
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