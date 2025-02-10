import styled from "styled-components";
import { useEffect } from "react";
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
`;

const MapSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const MapImage = styled.img`
  width: 50%;
  height: 100px;
`;

const Details = styled.div`
  font-size: 0.9rem;
  color: #333;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
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

const DetailWrapper = styled.div`
  width: 100%;
`;

const PostPage = () => {
  useEffect(() => {
    let map = null;
    const initMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.511337, 127.012084),
        zoom: 13,
      });
    };
    initMap();
  }, []);
  return (
    <Container>
      <ContentWrapper>
        <TitleWrapper>IT관련 교육을 해주실 자원봉사자를 찾습니다!</TitleWrapper>
        <DescriptWrapper>
          안녕하세요, 저희 보육원에는 원생이 9명 정도 있습니다.
        </DescriptWrapper>
        <ButtonContainer>
          <BookmarkButton>☆</BookmarkButton>
          <ApplyButton>지원하기</ApplyButton>
        </ButtonContainer>
      </ContentWrapper>
      <MapWrapper>
        <MapSection>
          <MapImage id="map" />
        </MapSection>
        <DetailWrapper>
          <Details>
            <p>
              <strong>근무지명:</strong> 자연 보육원
            </p>
            <p>
              <strong>지역정보:</strong> 서울 용산구 삼각지역
            </p>
            <p>
              <strong>봉사날짜:</strong> 2025년 2월 16일 오전 10시
            </p>
            <p>
              <strong>모집인원:</strong> 03 / 10
            </p>
          </Details>
        </DetailWrapper>
      </MapWrapper>
    </Container>
  );
};

export default PostPage;
