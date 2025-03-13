import React from 'react';
import styled from 'styled-components';

const fundings = [
  {
    achievement: 680,
    title: '자립준비청년들에게 사회로 나갈 준비를 도와주세요.',
    institution: '자연보육원',
    daysLeft: 30,
  },
  {
    achievement: 680,
    title: '자립준비청년들에게 사회로 나갈 준비를 도와주세요.',
    institution: '자연보육원',
    daysLeft: 30,
  },
  {
    achievement: 680,
    title: '자립준비청년들에게 사회로 나갈 준비를 도와주세요.',
    institution: '자연보육원',
    daysLeft: 30,
  },
];

const FundingHistory = () => {
  return (
    <Container>
      <Header>
        <Title>펀딩 내역</Title>
        <TotalCount>
          <CountNumber>100</CountNumber>개의 기관
        </TotalCount>
      </Header>
      <Divider />
      <FundingGrid>
        {fundings.map((funding, index) => (
          <FundingCard key={index}>
            <ImagePlaceholder />
            <Achievement>{funding.achievement}% 달성</Achievement>
            <FundingTitle>{funding.title}</FundingTitle>
            <FundingDetails>
              <Institution>{funding.institution}</Institution>
              <DaysLeft>{funding.daysLeft}일 남음</DaysLeft>
            </FundingDetails>
          </FundingCard>
        ))}
      </FundingGrid>
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

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 140px;
  background-color: #c0c7d6;
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
