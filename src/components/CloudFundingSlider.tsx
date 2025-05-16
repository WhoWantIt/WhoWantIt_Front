import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 네비게이션용 훅

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
  const navigate = useNavigate(); // 상세 페이지 이동

  const [fundings, setFundings] = useState<Funding[]>([]);
  const [loading, setLoading] = useState(true);
  const [pickIndex, setPickIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('accessToken') || '';

  // 펀딩 데이터 로드
  useEffect(() => {
    setLoading(true);
    setError(null);
    const base = API_BASE_URL?.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
    axios
      .get(`${base}fundings/lists`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.data.isSuccess && Array.isArray(res.data.result)) {
          setFundings(res.data.result);
        } else {
          setError('펀딩 데이터를 불러오지 못했습니다.');
        }
      })
      .catch(() => setError('네트워크 오류가 발생했습니다.'))
      .finally(() => setLoading(false));
  }, [token]);

  // 이전/다음 버튼 핸들러
  const onPrev = useCallback(() => {
    setPickIndex(prev => (fundings.length ? (prev === 0 ? fundings.length - 1 : prev - 1) : 0));
  }, [fundings.length]);

  const onNext = useCallback(() => {
    setPickIndex(prev => (fundings.length ? (prev === fundings.length - 1 ? 0 : prev + 1) : 0));
  }, [fundings.length]);

  // 클릭 시 상세 페이지로 이동
  const handleClick = () => {
    const id = fundings[pickIndex]?.fundingId;
    if (id) navigate(`/crowdfunding/detail/${id}`);
  };

  return (
    <Container>
      {/* 로딩 상태 */}
      {loading && <LoadingText>로딩 중...</LoadingText>}
      {/* 에러 상태 */}
      {error && <ErrorText>{error}</ErrorText>}
      {/* 데이터 없음 */}
      {!loading && !error && fundings.length === 0 && (
        <LoadingText>펀딩 내역이 없습니다.</LoadingText>
      )}
      {/* 슬라이더 렌더 */}
      {!loading && !error && fundings.length > 0 && (
        <>
          {/* 이미지 클릭 시 상세 이동 */}
          <FillImage
            src={fundings[pickIndex].attachedImage}
            alt={fundings[pickIndex].title}
            onClick={handleClick}
          />
          <Arrow isLeft onClick={onPrev}>&lt;</Arrow>
          <Arrow onClick={onNext}>&gt;</Arrow>
          <PickerWrapper>
            {fundings.map((_, idx) => (
              <Picker
                key={idx}
                onClick={() => setPickIndex(idx)}
                background={pickIndex === idx ? 'orange' : 'white'}
              />
            ))}
          </PickerWrapper>
        </>
      )}
    </Container>
  );
};

export default CloudFundingSlider;

/** Styled Components **/
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FillImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer; /* 클릭 가능 표시 */
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
  padding: 4px;
  border-radius: 4px;
`;

const PickerWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  display: flex;
  gap: 8px;
`;

const Picker = styled.div<{ background: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ background }) => background};
  cursor: pointer;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  color: #666;
`;

const ErrorText = styled.div`
  font-size: 1rem;
  color: red;
`;
