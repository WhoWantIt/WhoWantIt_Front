import styled from "styled-components";
import Navigation from "../../components/Navigation.tsx";
import Footer from "../../components/Footer";
import MainImage from "../../assets/main_image.svg";
import YouTubePlayer from "../../components/YouTubePlayer";
import GlobalStyle from "../../components/GlobalStyle";
import Chart from "../../components/Chart";
import CloudFundingSlider from "../../components/CloudFundingSlider";
import VolunteerSlider from "../../components/VolunteerSlider";

// HomePage 컴포넌트 정의
const HomePage = () => {
  return (
    <Wrapper>
      <Navigation />

      {/* 유튜브 섹션 */}
      <GlobalStyle />
      <YouTubePlayer videoId="zdOgKCOY570" />

      {/* 기존 메인 이미지 */}
      <Image src={MainImage} alt="WhoWantIt Main" />

      {/* 기존 소개 섹션 */}
      <IntroSection>
        <h2>Who Want It 은</h2>
        <p>후원자와 복지센터를 연결해 필요한 도움을 전합니다.</p>
      </IntroSection>

      {/* 차트 섹션 */}
      <ChartSection>
        <Chart type="donut" title="기부 현황" />
        <Chart type="bar" title="월별 참여자 수" />
      </ChartSection>

      {/* 클라우드 펀딩 슬라이더 */}
      <SliderWrapper>
        <h2>클라우드 펀딩 참여하기</h2>
        <CloudFundingSlider />
      </SliderWrapper>

      {/* 자원봉사 공고 슬라이더 */}
      <SliderWrapper>
        <h2>최근 자원봉사 공고 알아보기</h2>
        <VolunteerSlider />
      </SliderWrapper>

      <Footer />
    </Wrapper>
  );
};

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Pretendard, sans-serif;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const IntroSection = styled.section`
  text-align: center;
  padding: 50px 20px;
  background-color: #f9f9f9;
  h2 {
    font-size: clamp(20px, 2.5vw, 36px);
    font-weight: bold;
  }
  p {
    font-size: clamp(14px, 1.5vw, 20px);
    color: #5a5a5a;
  }
`;

const ChartSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 40px 0;
`;

const SliderWrapper = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  margin-bottom: 40px;
  text-align: center;
`;

export default HomePage;
