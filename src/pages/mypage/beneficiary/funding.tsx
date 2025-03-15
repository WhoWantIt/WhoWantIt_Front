import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

interface Funding {
  fundingId: number;
  title: string;
  attachedImage: string;
  fundingAmount: number;
  beneficiaryId: number;
  beneficiaryName: string;
  beneficiaryNickname: string;
  dday: string;
}

const FundingHistory = () => {
  const [fundings, setFundings] = useState<Funding[]>([]);
  const beneficiaryId = localStorage.getItem('beneficiaryId');

  useEffect(() => {
    if (!beneficiaryId) return;

    const fetchFundings = async () => {
      try {
        const response = await axios.get(
          `https://your-api.com/beneficiaries/fundings/${beneficiaryId}`
        );

        if (response.data.isSuccess) {
          setFundings(response.data.result.fundingList);
        }
      } catch (error) {
        console.error('펀딩 목록 가져오기 실패:', error);
      }
    };

    fetchFundings();
  }, [beneficiaryId]);

  return (
    <Container>
      <Header>
        <Title>펀딩 내역</Title>
        <TotalCount>
          <CountNumber>{fundings.length}</CountNumber>개의 펀딩
        </TotalCount>
      </Header>
      <Divider />
      {fundings.length > 0 ? (
        <FundingGrid>
          {fundings.map((funding) => (
            <FundingCard key={funding.fundingId}>
              <Image src={funding.attachedImage || "https://via.placeholder.com/140"} alt="펀딩 이미지" />
              <Achievement>{funding.fundingAmount}원 모금됨</Achievement>
              <FundingTitle>{funding.title}</FundingTitle>
              <FundingDetails>
                <Institution>{funding.beneficiaryName}</Institution>
                <DaysLeft>{funding.dday}일 남음</DaysLeft>
              </FundingDetails>
            </FundingCard>
          ))}
        </FundingGrid>
      ) : (
        <NoFundingMessage>등록된 펀딩이 없습니다.</NoFundingMessage>
      )}
      <Pagination>
        {[...Array(10)].map((_, index) => (
          <PageNumber key={index}>{index + 1}</PageNumber>
        ))}
      </Pagination>
    </Container>
  );
};

export default FundingHistory;

const Container = styled.div`
  padding: 40px;
  font-family: Pretendard, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: Semibold;
  color: #3e5879;
  margin: 0;
`;

const TotalCount = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 16px;
  color: #3e5879;
`;

const CountNumber = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #3e5879;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin: 20px 0 30px 0;
`;

const FundingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

const FundingCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Achievement = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;

const FundingTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const FundingDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #555;
`;

const Institution = styled.div``;

const DaysLeft = styled.div``;

const NoFundingMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #3e5879;
  margin: 20px 0;
`;

const Pagination = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 5px;
`;

const PageNumber = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  color: #3e5879;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
