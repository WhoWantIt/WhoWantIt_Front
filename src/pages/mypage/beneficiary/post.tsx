import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../../utils/api';

interface Post {
  id: string;
  status: string;
  month: string;
  institution: string;
}

const ITEMS_PER_PAGE = 9;

const PostHistory: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const beneficiaryId = localStorage.getItem('beneficiaryId');

  useEffect(() => {
    if (!beneficiaryId) return;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/beneficiaries/posts/${beneficiaryId}`,
          { params: { page: currentPage, size: ITEMS_PER_PAGE } }
        );

        if (response.data.isSuccess) {
          setPosts(response.data.result.postList as Post[]);
          setTotalCount(response.data.result.totalCount as number);
        } else {
          setError('데이터를 불러오지 못했습니다.');
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('서버 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [beneficiaryId, currentPage]);

  if (!beneficiaryId) {
    return (
      <Container>
        <Message>유효한 사용자가 아닙니다.</Message>
      </Container>
    );
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <Container>
      <Header>
        <Title>게시글 내역</Title>
        <TotalCount>총 <CountNumber>{totalCount}</CountNumber>개 게시글</TotalCount>
      </Header>
      <Divider />

      {loading ? (
        <Message>로딩 중...</Message>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <>
          <PostGrid>
            {posts.length > 0 ? (
              posts.map(post => (
                <PostCard key={post.id} status={post.status}>
                  <CardHeader>
                    <Month>{post.month} 후원 현황</Month>
                  </CardHeader>
                  <InstitutionName>{post.institution}</InstitutionName>
                  <Status>{post.status}</Status>
                </PostCard>
              ))
            ) : (
              <EmptyMessage>등록된 게시글이 없습니다.</EmptyMessage>
            )}
          </PostGrid>

          {totalPages > 1 && (
            <Pagination>
              <PageButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                이전
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageNumber
                  key={i}
                  active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PageNumber>
              ))}
              <PageButton
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                다음
              </PageButton>
            </Pagination>
          )}
        </>
      )}
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

const Message = styled.div`
  text-align: center;
  color: #555;
  margin: 20px 0;
`;

const ErrorMessage = styled(Message)`
  color: #e74c3c;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

const EmptyMessage = styled(Message)`
  grid-column: span 3;
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

const PageButton = styled.button`
  padding: 5px 10px;
  background-color: #3e5879;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageNumber = styled(PageButton)<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#3e5879' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#3e5879')};
  border: 1px solid #3e5879;

  &:hover:enabled {
    background-color: #3e5879;
    color: white;
  }
`;
