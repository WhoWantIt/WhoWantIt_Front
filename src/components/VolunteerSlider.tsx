import styled from 'styled-components';

const VolunteerSlider = () => {
  return (
    <SliderContainer>
      <p>자원봉사 공고 슬라이더 영역</p>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  height: 150px;
  background-color: #f7f7f7;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
`;

export default VolunteerSlider;