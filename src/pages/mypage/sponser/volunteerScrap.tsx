import { useEffect, useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import BookMarkColorSVG from "../../../assets/volunteer/bookmark_color.svg";

const VolunteerScrapPage = () => {
  const navigate = useNavigate();
  const [documents] = useState<string[]>([
    "스크랩",
    "참여한 펀딩",
    "참여한 봉사",
    "마이페이지",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [volunteerData, setVolunteerData] = useState<any[]>([]);

  useEffect(() => {
    const fetchVolunteerScraps = async () => {
      try {
        const response = await api.get("/sponsors/scraps/volunteers");
        if (response.data.isSuccess) {
          setVolunteerData(response.data.result);
        }
      } catch (error) {
        console.error("Failed to fetch volunteer scrap data", error);
      }
    };
    fetchVolunteerScraps();
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

  const goToVolunteerDetail = (volunteerId: number) => {
    navigate(`/volunteer/${volunteerId}`);
  };

  const goToFundingPage = () => {
    navigate("/sponser/scrap/funding");
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
              <Button onClick={goToFundingPage}>#클라우드 펀딩</Button>
              <Button active>#자원봉사 공고</Button>
            </ButtonWrapper>
            <VolunteerGrid>
              {volunteerData.map((volunteer) => (
                <Card>
                  <VolunteerCard
                    key={volunteer.volunteerId}
                    onClick={() => goToVolunteerDetail(volunteer.volunteerId)}
                  >
                    <CardTitle>{volunteer.title}</CardTitle>
                    <CardStartDate>
                      {volunteer.startTime.split("T")[0]}~
                    </CardStartDate>
                    <CardMax>{volunteer.currentCapacity}명 모집중</CardMax>
                    <DetailWrapper>
                      <CardAddresss>{volunteer.address}</CardAddresss>
                      <CardDeadLine>D-{volunteer.dday}</CardDeadLine>
                    </DetailWrapper>
                  </VolunteerCard>
                  <DetailOutCard>
                    <CardNickname>{volunteer.beneficiaryName}</CardNickname>
                    <img src={BookMarkColorSVG} alt="Bookmark" />
                  </DetailOutCard>
                </Card>
              ))}
            </VolunteerGrid>
          </Content>
        </MainContent>
      </Container>
    </>
  );
};

export default VolunteerScrapPage;

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

const VolunteerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
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

const Card = styled.div`
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

const VolunteerCard = styled.div`
  width: 250px;
  height: 150px;
  padding: clamp(10px, 2vw, 20px);
  border-radius: 10px;
  background-color: #c0c7d6;
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #a6b0c3;
  }
`;

const CardTitle = styled.div`
  font-size: clamp(14px, 1.5vw, 18px);
  font-weight: bold;
`;

const CardStartDate = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
  margin-top: 5px;
`;

const CardMax = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
  margin-top: 5px;
`;

const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const CardAddresss = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
`;

const CardDeadLine = styled.div`
  display: flex;
  font-size: clamp(12px, 1.2vw, 16px);
  color: black;
`;

const DetailOutCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  color: white;
  font-weight: 400;
`;

const CardNickname = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
  color: black;
`;
