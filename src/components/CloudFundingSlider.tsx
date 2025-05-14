// src/components/CloudFundingSlider.tsx
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// 환경변수에서 API URL을 가져옵니다.
const API_BASE_URL = import.meta.env.VITE_API_URL;

// API 응답 타입 정의
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
  // 펀딩 목록 및 로딩 상태
  const [fundings, setFundings] = useState<Funding[]>([]);
  const [loading, setLoading] = useState(true);
  // 현재 선택된 이미지 인덱스
  const [pickIndex, setPickIndex] = useState(0);
  const token = localStorage.getItem('accessToken') || '';

  // 데이터 페치: 컴포넌트 마운트 시 실행
  useEffect(() => {
    setLoading(true);
    const base = API_BASE_URL?.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
    axios
      .get(`${base}fundings/lists`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.data.isSuccess && Array.isArray(res.data.result)) {
          setFundings(res.data.result);
        }
      })
      .catch(err => console.error('펀딩 목록 조회 실패:', err))
      .finally(() => setLoading(false));
  }, [token]);

  // 로딩이 끝나고 데이터가 없으면 컴포넌트 숨김
  if (!loading && fundings.length === 0) {
    return null;
  }

  // 이전 이미지로 이동
  const handlePrevClick = useCallback(() => {
    setPickIndex(prev => (prev === 0 ? fundings.length - 1 : prev - 1));
  }, [fundings.length]);

  // 다음 이미지로 이동
  const handleNextClick = useCallback(() => {
    setPickIndex(prev => (prev === fundings.length - 1 ? 0 : prev + 1));
  }, [fundings.length]);

  return (
    // 로딩 중이거나 데이터 있든 항상 컨테이너 표시
    <Container>
      {/* 로딩이 끝나고 데이터 있을 때만 슬라이드 내용 표시 */}
      {!loading && fundings.length > 0 && (
        <>
          <FillImage
            src={fundings[pickIndex].attachedImage}
            alt={fundings[pickIndex].title}
          />
          <Arrow isLeft onClick={handlePrevClick}>{'<'}</Arrow>
          <Arrow onClick={handleNextClick}>{'>'}</Arrow>
          <PickerWrapper>
            {fundings.map((_, idx) => (
              <Picker
                key={idx}
                onClick={() => idx !== pickIndex && setPickIndex(idx)}
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

// 슬라이더 전체 컨테이너
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 이미지 채우기
const FillImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 좌우 화살표 버튼
const Arrow = styled.div<{ isLeft?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ isLeft }) => (isLeft ? '10px' : 'auto')};
  right: ${({ isLeft }) => (isLeft ? 'auto' : '10px')};
  cursor: pointer;
  font-size: 1.8rem;
  z-index: 1;
  user-select: none;
`;

// 하단 dot 네비게이션 래퍼
const PickerWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

// 개별 dot
const Picker = styled.div<{ background: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ background }) => background};
  cursor: pointer;
`;
