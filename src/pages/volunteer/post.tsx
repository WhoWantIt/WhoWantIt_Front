import styled from "styled-components";
import { useEffect, useState } from "react";
import BookMarkSVG from "../../assets/volunteer/bookmark.svg";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 40px;
  background-color: #f8f7f7;
  height: 100vh;
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
    background-color: #1a252f;
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
const PostPage = () => {
  const [applicants, setApplicants] = useState(0);
  const maxApplicants = 10; // 차후 변경사항
  useEffect(() => {
    const initMap = () => {
      new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.511337, 127.012084),
        zoom: 13,
      });
    };
    initMap();
  }, []);
  const handleApply = () => {
    if (applicants < maxApplicants) {
      setApplicants((prev) => prev + 1);
    } else {
      alert("모집이 마감되었습니다.");
    }
  };
  return (
    <Container>
      <ContentWrapper>
        <TitleWrapper>IT관련 교육을 해주실 자원봉사자를 찾습니다!</TitleWrapper>
        <DescriptWrapper>
          안녕하세요, 저희 보육원에는 원생이 9명 정도 있습니다.
        </DescriptWrapper>
        <ButtonContainer>
          <BookmarkButton>
            <img src={BookMarkSVG} />
          </BookmarkButton>
          <ApplyButton onClick={handleApply}>지원하기</ApplyButton>
        </ButtonContainer>
      </ContentWrapper>
      <MapWrapper>
        <MapSection>
          <div id="map" style={{ width: "130%", height: "400px" }}></div>
        </MapSection>
        <DetailsWrapper>
          <Details>
            <Title>근무지명</Title>
            <Subtitle>자연 보육원</Subtitle>
          </Details>
          <Details>
            <Title>지역정보</Title>
            <Subtitle>서울 용산구 삼각지역</Subtitle>
          </Details>
          <Details>
            <Title>봉사날짜</Title>
            <Subtitle>2025년 2월 16일 오전 10시시</Subtitle>
          </Details>
          <Details>
            <Title>모집인원</Title>
            <Subtitle>
              {applicants} / {maxApplicants}
            </Subtitle>
          </Details>
        </DetailsWrapper>
      </MapWrapper>
    </Container>
  );
};

export default PostPage;
