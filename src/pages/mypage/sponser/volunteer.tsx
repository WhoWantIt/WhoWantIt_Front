import { useEffect, useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";

const SponserVolunteerPage = () => {
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
    const fetchVolunteers = async () => {
      try {
        const response = await api.get("/sponsors/volunteers");
        if (response.data.isSuccess) {
          setVolunteerData(response.data.result.volunteerList);
        }
      } catch (error) {
        console.error("Failed to fetch volunteer data", error);
      }
    };

    fetchVolunteers();
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
          <Title>참여한 봉사</Title>
          <TotalCount>
            <strong>{volunteerData.length}</strong>건의 봉사 참여
          </TotalCount>
          <Divider />
          <VolunteerGrid>
            {volunteerData.map((volunteer) => (
              <VolunteerCard
                key={volunteer.volunteerId}
                onClick={() => goToVolunteerDetail(volunteer.volunteerId)}
              >
                <VolunteerTitle>{volunteer.title}</VolunteerTitle>
                <VolunteerInstitution>{volunteer.beneficiaryName}</VolunteerInstitution>
                <VolunteerDetails>
                  <VolunteerAddress>{volunteer.address}</VolunteerAddress>
                  <VolunteerDday>{volunteer.dday}</VolunteerDday>
                </VolunteerDetails>
              </VolunteerCard>
            ))}
          </VolunteerGrid>
        </MainContent>
      </Container>
    </>
  );
};

export default SponserVolunteerPage;

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

const VolunteerGrid = styled.div`
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

const VolunteerCard = styled.div`
  width: clamp(140px, 18vw, 200px);
  height: clamp(80px, 12vw, 120px);
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

const VolunteerTitle = styled.div`
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: bold;
`;

const VolunteerInstitution = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
  margin-top: 5px;
`;

const VolunteerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: clamp(12px, 1.2vw, 16px);
  margin-top: auto;
`;

const VolunteerAddress = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
`;

const VolunteerDday = styled.div`
  font-weight: bold;
  color: #333;
`;
