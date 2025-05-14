import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  // state 및 hook은 컴포넌트 최상단에서 일관되게 호출
  const [fundings, setFundings] = useState<Funding[]>([]);
  const [loading, setLoading] = useState(true);
  const [pickIndex, setPickIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('accessToken') || '';

  // 데이터 페치
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

  // 인덱스 변경
  const onPrev = useCallback(() => {
    setPickIndex(prev => (fundings.length ? (prev === 0 ? fundings.length - 1 : prev - 1) : 0));
  }, [fundings]);
  const onNext = useCallback(() => {
    setPickIndex(prev => (fundings.length ? (prev === fundings.length - 1 ? 0 : prev + 1) : 0));
  }, [fundings]);

  return (
    <Container>
      {/* 로딩 중, 에러, 빈 데이터, 정상 데이터 순으로 조건부 렌더링 */}
      {loading && <LoadingText>로딩 중...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}
      {!loading && !error && fundings.length === 0 && (
        <LoadingText>펀딩 내역이 없습니다.</LoadingText>
      )}
      {!loading && !error && fundings.length > 0 && (
        <>
          <FillImage src={fundings[pickIndex].attachedImage} alt={fundings[pickIndex].title} />
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
