import styled from "styled-components";
import { useEffect, useState } from "react";
import BookMarkSVG from "../../assets/volunteer/bookmark.svg";
import BookMarkColorSVG from "../../assets/volunteer/bookmark_color.svg";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
interface VolunteerType {
  volunteerId: number;
  beneficiaryId: string;
  nickname: string;
  title: string;
  field: string;
  content: string;
  attachedImage: string;
  startTime: string;
  deadline: string;
  maxCapacity: number;
  currentCapacity: number;
  approvalStautus: string;
  createAt: string;
  updateAt: string;
  address: string;
}
const PostPage = () => {
  const { volunteerId } = useParams<{ volunteerId: string }>();
  //const [searchParams] = useSearchParams();
  //const navigate = useNavigate();
  const Api = import.meta.env.VITE_API_URL;
  const accessToken = localStorage.getItem("accessToken");
  // 지원에 대한 상태 관리
  const [isApplied, setIsApplied] = useState<boolean>(false);
  // 스크랩에 대한 상태 관리
  const [isScraped, setIsScraped] = useState<boolean>(false);
  const [applicants, setApplicants] = useState(0);
  const [volunteer, setVolunteer] = useState<VolunteerType>();
  //const maxApplicants = 10; // 차후 변경사항

  useEffect(() => {
    const initMap = () => {
      new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.511337, 127.012084),
        zoom: 13,
      });
    };
    initMap();
  }, []);
  useEffect(() => {
    api
      .get(`/volunteers/${volunteerId}`)
      .then((res) => setVolunteer(res.data.result))
      .catch((err) => {
        console.error("Error fetching post:", err);
      });
  }, [volunteerId]);
  const handleApply = async () => {
    try {
      const client = await fetch(`${Api}volunteers/${volunteerId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = client.json();
      console.log("지원하기에 대한 res:", data);
      if (applicants < (volunteer?.maxCapacity ?? 0)) {
        setApplicants((prev) => prev + 1);
        setIsApplied(true);
      } else {
        alert("모집 인원이 마감되었습니다.");
      }
    } catch (error) {
      console.error("REQUEST FAILED:", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };
  const handleDelete = async () => {
    try {
      const client = await fetch(`${Api}volunteers/${volunteerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = client.json();
      console.log("지원 취소하기에 대한 res:", data);
      // 지원한 숫자 줄어들게 하기
      setApplicants((prev) => prev - 1);
      setIsApplied(false);
    } catch (error) {
      console.error("REQUEST FAILED:", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };
  const handleScrap = async () => {
    try {
      const client = await fetch(`${Api}volunteers/scraps/${volunteerId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = client.json();
      setIsScraped(true);
      console.log("스크랩하기에 대한 res:", data);
    } catch (error) {
      console.error("REQUEST FAILED: ", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };

  const handleDeleteScrap = async () => {
    try {
      const client = await fetch(`${api}volunteers/scraps/${volunteerId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = client.json();
      setIsScraped(false);
      console.log("스크랩 취소에 대한 res:", data);
    } catch (error) {
      console.error("REQUEST FAILED: ", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };
  return (
    <Container>
      <ContentWrapper>
        <TitleWrapper>{volunteer?.title}</TitleWrapper>
        <DescriptWrapper>{volunteer?.content}</DescriptWrapper>
        <ButtonContainer>
          <BookmarkButton
            onClick={!isScraped ? handleScrap : handleDeleteScrap}
          >
            {!isScraped ? (
              <img src={BookMarkSVG} />
            ) : (
              <img src={BookMarkColorSVG} />
            )}
          </BookmarkButton>
          <ApplyButton onClick={!isApplied ? handleApply : handleDelete}>
            {!isApplied ? "지원하기" : "취소하기"}
          </ApplyButton>
        </ButtonContainer>
      </ContentWrapper>
      <MapWrapper>
        <MapSection>
          <div id="map" style={{ width: "130%", height: "400px" }}></div>
        </MapSection>
        <DetailsWrapper>
          <Details>
            <Title>근무지명</Title>
            <Subtitle>{volunteer?.nickname}</Subtitle>
          </Details>
          <Details>
            <Title>지역정보</Title>
            <Subtitle>{volunteer?.address}</Subtitle>
          </Details>
          <Details>
            <Title>봉사날짜</Title>
            <Subtitle>{volunteer?.startTime}</Subtitle>
          </Details>
          <Details>
            <Title>모집인원</Title>
            <Subtitle>
              {applicants} / {volunteer?.maxCapacity}
            </Subtitle>
          </Details>
        </DetailsWrapper>
      </MapWrapper>
    </Container>
  );
};

export default PostPage;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 40px;
  background-color: #f8f7f7;
  height: 100vh;
  font-family: Pretendard, sans-serif;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 900px;
  margin-right: 40px;
`;

const TitleWrapper = styled.div`
  width: 892px;
  height: 141px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 20px;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DescriptWrapper = styled.div`
  width: 892px;
  height: 497px;
  background-color: #ffffff;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 10px;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 450px;
  margin-left: 80px;
`;

const MapSection = styled.div`
  width: 130%;
  height: 400px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
  margin-left: 50%;
`;

const BookmarkButton = styled.button`
  width: 75px;
  height: 66px;
  background: none;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 5px;
`;

const ApplyButton = styled.button`
  width: 297px;
  height: 71px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 25px;
  cursor: pointer;
  &:hover {
    background-color: rgb(140, 159, 180);
  }
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Details = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: -30px;
  gap: 10px; /* 간격 추가 */
`;
const Title = styled.h6`
  color: #c2c6cc;
  font-family: "Pretandard", sans-serif;
  font-weight: bold;
  font-size: 16px;
  margin: 4px 0;
`;
const Subtitle = styled.h6`
  color: black;
  font-family: "Pretandard", sans-serif;
  font-size: 16px;
`;
