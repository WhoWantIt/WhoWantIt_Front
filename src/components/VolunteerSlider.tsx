// src/components/VolunteerSlider.tsx
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import api from '../utils/api';

interface VolunteerPost {
  volunteerId: number;
  title: string;
  address: string;
  deadline: string;
  attachedImage: string[];
}

const VolunteerSlider: React.FC = () => {
  // 자원봉사 글 목록
  const [posts, setPosts] = useState<VolunteerPost[]>([]);
  // 로딩 상태
  const [loading, setLoading] = useState(true);
  // 현재 슬라이드 인덱스
  const [pickIndex, setPickIndex] = useState(0);

  useEffect(() => {
    api
      .get('/volunteers')
      .then(res => {
        if (res.data.isSuccess && Array.isArray(res.data.result.content)) {
          const list: VolunteerPost[] = res.data.result.content.map((item: any) => ({
            volunteerId: item.volunteerId,
            title: item.title,
            address: item.address.match(/^서울시\s\S+/)?.[0] || item.address,
            deadline: (() => {
              const d = new Date(item.deadline);
              const t = Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return t >= 0 ? `D-${t}` : `D+${-t}(마감)`;
            })(),
            attachedImage: Array.isArray(item.attachedImage) ? item.attachedImage : [],
          }));
          setPosts(list);
        }
      })
      .catch(err => console.error('자원봉사 슬라이더 데이터 로드 실패:', err))
      .finally(() => setLoading(false));
  }, []);

  // 로딩 끝나고 데이터 없으면 숨김
  if (!loading && posts.length === 0) return null;

  // 이전 슬라이드
  const handlePrev = useCallback(() => {
    setPickIndex(prev => (prev === 0 ? posts.length - 1 : prev - 1));
  }, [posts.length]);

  // 다음 슬라이드
  const handleNext = useCallback(() => {
    setPickIndex(prev => (prev === posts.length - 1 ? 0 : prev + 1));
  }, [posts.length]);

  return (
    // 컨테이너 항상 렌더
    <Container>
      {!loading && posts.length > 0 && (
        <>
          <Slide>
            <ImageWrapper>
              <Image
                src={posts[pickIndex].attachedImage[0] || 'https://via.placeholder.com/400x200'}
                alt={posts[pickIndex].title}
              />
            </ImageWrapper>
            <Content>
              <PostTitle>{posts[pickIndex].title}</PostTitle>
              <Meta>{posts[pickIndex].deadline} · {posts[pickIndex].address}</Meta>
              <DetailButton onClick={() => window.location.href = `/volunteer/post/${posts[pickIndex].volunteerId}`}>자세히 보기</DetailButton>
            </Content>
          </Slide>
          <Arrow isLeft onClick={handlePrev}>{'<'}</Arrow>
          <Arrow onClick={handleNext}>{'>'}</Arrow>
          <PickerWrapper>
            {posts.map((_, idx) => (
              <Picker
                key={idx}
                onClick={() => idx !== pickIndex && setPickIndex(idx)}
                background={pickIndex === idx ? '#3e5879' : '#ccc'}
              />
            ))}
          </PickerWrapper>
        </>
      )}
    </Container>
  );
};

export default VolunteerSlider;

/** Styled Components **/
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  height: 260px;
  background: #f5f5f5;
  overflow: hidden;
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
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
  &:hover { opacity: 0.9; }
`;

const Arrow = styled.div<{ isLeft?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ isLeft }) => (isLeft ? '10px' : 'auto')};
  right: ${({ isLeft }) => (isLeft ? 'auto' : '10px')};
  cursor: pointer;
  font-size: 1.8rem;
  background: rgba(255,255,255,0.7);
  padding: 4px 8px;
  border-radius: 4px;
  user-select: none;
`;

const PickerWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Picker = styled.div<{ background: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ background }) => background};
  cursor: pointer;
`;
