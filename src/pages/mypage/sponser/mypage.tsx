import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../../../components/Navigation";
import api from "../../../utils/api";

const PersonalPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/users/me");
        setUserInfo(response.data.result);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <Container>
        <Sidebar>
          <ButtonWrapper>마이페이지</ButtonWrapper>
          <DocumentList>
            <DocumentItem>스크랩</DocumentItem>
            <DocumentItem>참여한 펀딩</DocumentItem>
            <DocumentItem>참여한 봉사</DocumentItem>
            <DocumentItem>개인정보</DocumentItem>
          </DocumentList>
        </Sidebar>
        <MainContent>
          <ProfileWrapper>
            <Title>마이페이지</Title>
            <CardImage src={userInfo.image} alt="User Profile" />
            {Object.entries(userInfo).map(
              ([key, value]) =>
                key !== "id" &&
                key !== "password" &&
                key !== "image" && (
                  <ProfileItem key={key}>
                    <Subtitle>{key}</Subtitle>
                    <ProfileValue>{value}</ProfileValue>
                  </ProfileItem>
                ),
            )}
            <Button onClick={() => navigate("/sponser/personal-edit")}>
              수정하기
            </Button>
          </ProfileWrapper>
        </MainContent>
      </Container>
    </>
  );
};

export default PersonalPage;

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
  margin-top: 30px;
`;
const DocumentList = styled.ul`
  list-style: none;
  border-bottom: 2px solid #ffffff;
  padding: 0;
  margin-top: 100px;
  width: 250px;
`;
const DocumentItem = styled.li`
  background-color: #3e5879;
  cursor: pointer;
  &:hover {
    background-color: #adacc2;
  }
  border-top: 2px solid white;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const ProfileWrapper = styled.div`
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #3e5879;
`;
const ProfileItem = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
`;
const Subtitle = styled.div`
  color: #3e5879;
  font-weight: bold;
  margin-bottom: 5px;
`;
const ProfileValue = styled.div`
  color: #555;
`;
const Button = styled.button`
  width: 100px;
  height: 40px;
  padding: 10px;
  background: #3e5879;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
`;
const CardImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  object-fit: cover;
`;
