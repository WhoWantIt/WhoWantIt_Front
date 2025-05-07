// src/components/CloudFundingSlider.tsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import axios from 'axios';

// 슬릭 슬라이더 CSS (한 번만 불러오기)
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface Funding {
  fundingId: number;
  title: string;
  attachedImage: string;
  fundingAmount: number;
  targetAmount?: number;
  beneficiaryName: string;
  dday: number;
}

const CloudFundingSlider: React.FC = () => {
  const [fundings, setFundings] = useState<Funding[]>([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('accessToken') || '';

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/fundings/lists`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.isSuccess && Array.isArray(res.data.result)) {
          setFundings(res.data.result);
        }
      })
      .catch(err => console.error('펀딩 목록 조회 실패:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingText>로딩 중...</LoadingText>;
  if (fundings.length === 0) return <LoadingText>펀딩 내역이 없습니다.</LoadingText>;

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
  };

  return (
    <SliderContainer {...settings}>
      {fundings.map(item => {
        const percent = item.targetAmount
          ? Math.min(100, Math.round((item.fundingAmount / item.targetAmount) * 100))
          : Math.min(100, item.fundingAmount);

        return (
          <Slide key={item.fundingId}>
            <ImageWrapper>
              <Image src={item.attachedImage} alt={item.title} />
            </ImageWrapper>
            <Content>
              <Title>{item.title}</Title>
              <SubTitle>
                {item.beneficiaryName} · {item.dday}일 남음
              </SubTitle>
              <ProgressContainer>
                <ProgressText>{percent}% 달성</ProgressText>
                <Bar>
                  <Fill percent={percent} />
                </Bar>
              </ProgressContainer>
              <DetailButton onClick={() => (window.location.href = `/crowdfunding/detail/${item.fundingId}`)}>
                더 자세히 보기
              </DetailButton>
            </Content>
          </Slide>
        );
      })}
    </SliderContainer>
  );
};

export default CloudFundingSlider;

/** Styled Components **/
const LoadingText = styled.p`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
`;

const SliderContainer = styled(Slider)`
  .slick-slide {
    display: flex !important;
    justify-content: center;
  }
  .slick-arrow {
    z-index: 2;
  }
`;

const Slide = styled.div`
  display: flex !important;
  align-items: center;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  max-width: 900px;
  margin: 0 auto;
`;

const ImageWrapper = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 6px;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
`;

const SubTitle = styled.p`
  margin: 0 0 12px;
  font-size: 1rem;
  color: #666;
`;

const ProgressContainer = styled.div`
  margin-bottom: 12px;
`;

const ProgressText = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 6px;
`;

const Bar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const Fill = styled.div<{ percent: number }>`
  width: ${p => p.percent}%;
  height: 100%;
  background: #3e5879;
  transition: width 0.5s ease;
`;

const DetailButton = styled.button`
  padding: 6px 14px;
  background: #3e5879;
  color: #fff;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.85;
  }
`;
