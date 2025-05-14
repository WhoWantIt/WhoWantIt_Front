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
  // Hooks는 최상단에서 일관되게 호출
  const [posts, setPosts] = useState<VolunteerPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pickIndex, setPickIndex] = useState<number>(0);

  // 데이터 페치
  useEffect(() => {
    setLoading(true);
    setError(null);
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
        } else {
          setError('자원봉사 데이터를 불러올 수 없습니다.');
        }
      })
      .catch(() => setError('네트워크 오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, []);

  // 이전/다음 인덱스 네비게이션
  const handlePrev = useCallback(() => {
    setPickIndex(prev => (posts.length ? (prev === 0 ? posts.length - 1 : prev - 1) : 0));
  }, [posts.length]);

  const handleNext = useCallback(() => {
    setPickIndex(prev => (posts.length ? (prev === posts.length - 1 ? 0 : prev + 1) : 0));
  }, [posts.length]);

  return (
    <Container>
      {/* 로딩, 오류, 빈 데이터, 정상 데이터 순으로 렌더링 */}
      {loading && <StatusText>로딩 중...</StatusText>}
      {error && <ErrorText>{error}</ErrorText>}
      {!loading && !error && posts.length === 0 && (
        <StatusText>봉사 공고가 없습니다.</StatusText>
      )}
      {!loading && !error && posts.length > 0 && (
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
              <DetailButton
                onClick={() => (window.location.href = `/volunteer/post/${posts[pickIndex].volunteerId}`)}
              >
                자세히 보기
              </DetailButton>
            </Content>
          </Slide>
          <Arrow isLeft onClick={handlePrev}>&lt;</Arrow>
          <Arrow onClick={handleNext}>&gt;</Arrow>
          <PickerWrapper>
            {posts.map((_, idx) => (
              <Picker
                key={idx}
                onClick={() => setPickIndex(idx)}
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
  height: 260px;
  margin: 0 auto;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

const PickerWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  display: flex;
  gap: 8px;
`;

const Picker = styled.div<{ background: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ background }) => background};
  cursor: pointer;
`;

const StatusText = styled.div`
  font-size: 1rem;
  color: #666;
`;

const ErrorText = styled.div`
  font-size: 1rem;
  color: red;
`;
