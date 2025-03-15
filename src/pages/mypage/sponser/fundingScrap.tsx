import { useEffect, useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

const FundingScrapPage = () => {
  const navigate = useNavigate();
  const [documents] = useState<string[]>([
    "스크랩",
    "참여한 펀딩",
    "참여한 봉사",
    "마이페이지",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [fundingData, setFundingData] = useState<any[]>([]);

  useEffect(() => {
    const fetchFundingScraps = async () => {
      try {
        const response = await api.get("/sponsors/scraps/fundings");
        if (response.data.isSuccess) {
          setFundingData(response.data.result);
        }
      } catch (error) {
        console.error("Failed to fetch funding scrap data", error);
      }
    };
    fetchFundingScraps();
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

  const goToVolunteerPage = () => {
    navigate("/sponser/scrap/volunteer");
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
          <Content>
            <ButtonWrapper>
              <Button active>#클라우드 펀딩</Button>
              <Button onClick={goToVolunteerPage}>#자원봉사 공고</Button>
            </ButtonWrapper>
            <FundingGrid>
              {fundingData.map((funding) => (
                <FundingCard
                  key={funding.fundingId}
                  onClick={() => goToFundingDetail(funding.fundingId)}
                >
                  <FundingImage
                    src={funding.attachedImage}
                    alt={funding.title}
                  />
                  <FundingAmount>
                    {funding.targetAmount.toLocaleString()}원 펀딩
                  </FundingAmount>
                  <FundingTitle>{funding.title}</FundingTitle>
                  <FundingInstitution>
                    {funding.beneficiaryName}
                  </FundingInstitution>
                  <FundingDetails>
                    <FundingDday>
                      {funding.dday === "마감" ? "마감" : `D-${funding.dday}`}
                    </FundingDday>
                  </FundingDetails>
                </FundingCard>
              ))}
            </FundingGrid>
          </Content>
        </MainContent>
      </Container>
    </>
  );
};

export default FundingScrapPage;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  font-family: Pretendard, sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #3e5879;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
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
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-direction: column;
`;

interface ButtonProps {
  active: boolean;
}
const Button = styled.button<ButtonProps>`
  font-size: 23px;
  color: ${({ active }) => (active ? "#3E5879" : "#E6D9D2")};
  width: 250px;
  padding: 15px 16px;
  border: none;
  border-bottom: 1.5px solid ${({ active }) => (active ? "#3E5879" : "#E6D9D2")};
  background: transparent;
  cursor: pointer;
  position: relative;
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
