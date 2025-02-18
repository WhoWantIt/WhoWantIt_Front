import styled from 'styled-components';

const CloudFundingSlider = () => {
  return (
    <SliderContainer>
      <p>클라우드 펀딩 슬라이더 영역</p>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  height: 150px;
  background-color: #f0f0f0;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
`;

export default CloudFundingSlider;