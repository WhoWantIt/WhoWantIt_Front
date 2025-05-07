// src/components/VolunteerSlider.tsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import api from '../utils/api';  // 실제 API 호출 유틸

// slick-carousel CSS (한 번만)
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface VolunteerPost {
  volunteerId: number;
  title: string;
  address: string;
  deadline: string;          // "D-10" 형태로 전처리해서 전달
  attachedImage: string[];   // 이미지 배열
}

const VolunteerSlider: React.FC = () => {
  const [posts, setPosts] = useState<VolunteerPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/volunteers')
      .then(res => {
        if (res.data.isSuccess && Array.isArray(res.data.result.content)) {
          // 필요한 값만 뽑아서 슬라이더용 포맷으로 가공
          const list: VolunteerPost[] = res.data.result.content.map((item: any) => ({
            volunteerId: item.volunteerId,
            title: item.title,
            // address는 "서울시 종로구 ..." 중 앞부분만 뽑아오시려면 여기서 가공
            address: item.address.match(/^서울시\s\S+/)?.[0] || item.address,
            // deadline: "2025-06-10" → D-day 계산
            deadline: (() => {
              const d = new Date(item.deadline);
              const t = Math.ceil(
                (d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              return t >= 0 ? `D-${t}` : `D+${-t}(마감)`;
            })(),
            attachedImage: item.attachedImage || [],
          }));
          setPosts(list);
        }
      })
      .catch(err => {
        console.error('자원봉사 슬라이더 데이터 로드 실패:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingText>로딩 중...</LoadingText>;
  if (posts.length === 0) return <LoadingText>봉사 공고가 없습니다.</LoadingText>;

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    appendDots: (dots: React.ReactNode) => <DotsContainer>{dots}</DotsContainer>,
    customPaging: () => <Dot />,
  };

  return (
    <SliderContainer {...settings}>
      {posts.map(post => (
        <Slide key={post.volunteerId}>
          <ImageWrapper>
            <Image
              src={post.attachedImage[0] || 'https://via.placeholder.com/400x200'}
              alt={post.title}
            />
          </ImageWrapper>
          <Content>
            <PostTitle>{post.title}</PostTitle>
            <Meta>
              {post.deadline} · {post.address}
            </Meta>
            <DetailButton
              onClick={() =>
                (window.location.href = `/volunteer/post/${post.volunteerId}`)
              }
            >
              자세히 보기
            </DetailButton>
          </Content>
        </Slide>
      ))}
    </SliderContainer>
  );
};

export default VolunteerSlider;


/** Styled Components **/
const LoadingText = styled.p`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
`;

const SliderContainer = styled(Slider)`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;

  .slick-list {
    overflow: hidden;
  }
  .slick-slide > div {
    outline: none;
  }
  .slick-prev,
  .slick-next {
    width: 40px;
    height: 40px;
    z-index: 2;
  }
`;

const Slide = styled.div`
  display: flex !important;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.div`
  flex: 1;
  margin-right: 24px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
`;

const Content = styled.div`
  flex: 1;
  text-align: left;
`;

const PostTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 1.3rem;
  color: #333;
`;

const Meta = styled.p`
  margin: 0 0 16px;
  font-size: 0.95rem;
  color: #666;
`;

const DetailButton = styled.button`
  padding: 8px 16px;
  background-color: #3e5879;
  color: #fff;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const DotsContainer = styled.ul`
  display: flex !important;
  justify-content: center;
  margin-top: 16px;

  li {
    margin: 0 4px;
  }
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  background: #3e5879;
  border: none;
  border-radius: 50%;
  opacity: 0.4;

  &:hover,
  &:focus {
    opacity: 0.7;
  }
`;
