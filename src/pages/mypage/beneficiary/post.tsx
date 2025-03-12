import React from 'react';
import styled from 'styled-components';

const posts = [
  { month: '12월', status: 'Not Verified', institution: '자연보육원' },
  { month: '11월', status: 'Verified', institution: '자연보육원' },
  { month: '10월', status: 'Verified', institution: '자연보육원' },
];

const PostHistory = () => {
  return (
    <Container>
      <Header>
        <Title>게시글 내역</Title>
        <TotalCount>
          <CountNumber>100</CountNumber>개의 기관
        </TotalCount>
      </Header>
      <Divider />
      <PostGrid>
        {posts.map((post, index) => (
          <PostCard key={index} status={post.status}>
            <CardHeader>
              <Month>{post.month} 후원 현황</Month>
            </CardHeader>
            <InstitutionName>{post.institution}</InstitutionName>
            <Status>{post.status}</Status>
          </PostCard>
        ))}
      </PostGrid>
      <Pagination>
        {[...Array(10)].map((_, index) => (
          <PageNumber key={index}>{index + 1}</PageNumber>
        ))}
      </Pagination>
    </Container>
  );
};

export default PostHistory;

const Container = styled.div`
  padding: 40px;
  font-family: Pretendard, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h2`
  font-size: 33px;
  font-weight: bold;
  color: #3e5879;
  margin: 0;
  text-align: center;
  width: 90%;
`;

const TotalCount = styled.div`
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

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

const PostCard = styled.div<{ status: string }>`
  padding: 20px;
  background-color: ${({ status }) =>
    status === 'Verified' ? '#3e5879' : '#c0c7d6'};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ status }) => (status === 'Verified' ? 'white' : 'black')};
`;

const CardHeader = styled.div`
  width: 100%;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Month = styled.div`
  font-size: 16px;
`;

const InstitutionName = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Status = styled.div`
  font-size: 12px;
  align-self: flex-end;
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
