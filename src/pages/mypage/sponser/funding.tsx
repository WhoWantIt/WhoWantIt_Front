import { useEffect, useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

const SponserFundingPage = () => {
  const navigate = useNavigate();
  const [documents] = useState<string[]>([
    "스크랩",
    "참여한 펀딩",
    "참여한 봉사",
    "마이페이지",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [fundingData, setFundingData] = useState<any[]>([]);
  const [totalFundingAmount, setTotalFundingAmount] = useState<number>(0);

  useEffect(() => {
    const fetchFundingData = async () => {
      try {
        const response = await api.get("/sponsors/fundings");
        if (response.data.isSuccess) {
          setFundingData(response.data.result.fundingList);
          const totalAmount = response.data.result.fundingList.reduce(
            (sum, funding) => sum + funding.fundingAmount,
            0
          );
          setTotalFundingAmount(totalAmount);
        }
      } catch (error) {
        console.error("Failed to fetch funding data", error);
      }
    };

    fetchFundingData();
  }, []);

  const handleNavigation = (doc: string) => {
    setActiveDoc(doc);
    const routes: { [key: string]: string } = {
      스크랩: "/sponser/scrap/funding",
      "참여한 펀딩": "/sponser/funding",
      "참여한 봉사": "/sponser/volunteer",
      마이페이지: "/sponser/mypage",
    };
    navigate(routes[doc]);
  };

  const goToFundingDetail = (fundingId: number) => {
    navigate(`/crowdfunding/${fundingId}`);
  };

  return (
    <>
      <Navigation />
      <Container>
        <Sidebar>
          <ButtonWrapper>마이페이지</ButtonWrapper>
          <DocumentList>
            {documents.map((doc, index) => (
              <DocumentItem
                key={index}
                active={activeDoc === doc}
                onClick={() => handleNavigation(doc)}
              >
                {doc}
              </DocumentItem>
            ))}
          </DocumentList>
        </Sidebar>
        <MainContent>
          <Title>참여한 펀딩</Title>
          <TotalCount>
            <strong>{totalFundingAmount.toLocaleString()}</strong>원 펀딩
          </TotalCount>
          <Divider />
          <FundingGrid>
            {fundingData.map((funding) => (
              <FundingCard
                key={funding.fundingId}
                onClick={() => goToFundingDetail(funding.fundingId)}
              >
                <FundingImage src={funding.attachedImage} alt={funding.title} />
                <FundingAmount>
                  {funding.fundingAmount.toLocaleString()}원 펀딩
                </FundingAmount>
                <FundingTitle>{funding.title}</FundingTitle>
                <FundingDetails>
                  <FundingInstitution>
                    {funding.beneficiaryName}
                  </FundingInstitution>
                  <FundingDday>
                    {funding.dday === "마감"
                      ? "마감"
                      : `${funding.dday}일 남음`}
                  </FundingDday>
                </FundingDetails>
              </FundingCard>
            ))}
          </FundingGrid>
        </MainContent>
      </Container>
    </>
  );
};

export default SponserFundingPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #3e5879;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 50px;
  font-size: 25px;
  font-weight: bold;
`;

const DocumentList = styled.ul`
  list-style: none;
  border-bottom: 1px solid #ffffff;
  padding: 0;
  margin-top: 50px;
  width: 250px;
`;
interface DocumentItemProps {
  active: boolean;
}

const DocumentItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<DocumentItemProps>`
  background-color: ${({ active }) => (active ? "#adacc2" : "#3e5879")};
  cursor: pointer;
  &:hover {
    background-color: #adacc2;
  }
  border-top: 1px solid #ffffff;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const TotalCount = styled.p`
  text-align: right;
  font-size: 18px;
  margin: 10px 0;
  color: #3e5879;

  strong {
    font-size: 24px;
    font-weight: bold;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;

const FundingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 20px 60px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 100px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 50px;
  }
`;

const FundingCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const FundingImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  background-color: #c0c7d6;
`;

const FundingAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #1e3a5f;
  margin-top: 15px;
`;

const FundingTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const FundingDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-top: auto;
  color: #6c6c6c;
`;

const FundingInstitution = styled.div`
  font-size: 14px;
`;

const FundingDday = styled.div`
  color: #3e5879;
`;
