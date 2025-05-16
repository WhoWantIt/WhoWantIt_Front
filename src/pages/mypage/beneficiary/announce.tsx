import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../../utils/api';

interface Announcement {
  postId: number;
  title: string;
  attachedImage: string;
  approvalStatus: string;
  beneficiaryId: number;
  beneficiaryName: string;
  beneficiaryNickname: string;
  dday: string;
}

const ITEMS_PER_PAGE = 9;

const AnnouncementHistory: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const beneficiaryId = localStorage.getItem('beneficiaryId');

  useEffect(() => {
    if (!beneficiaryId) return;

    const fetchAnnouncements = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/beneficiaries/posts/${beneficiaryId}`,
          { params: { page: currentPage, size: ITEMS_PER_PAGE } }
        );
        if (response.data.isSuccess) {
          const list = response.data.result.postList as Announcement[];
          setAnnouncements(list);
          setTotalCount(response.data.result.totalCount as number);
        } else {
          setError('공고 데이터를 불러오지 못했습니다.');
        }
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('서버 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [beneficiaryId, currentPage]);

  if (!beneficiaryId) {
    return <Container><Message>유효한 사용자가 아닙니다.</Message></Container>;
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <Container>
      <Header>
        <Title>공고 현황</Title>
        <TotalCount>총 <CountNumber>{totalCount}</CountNumber>개 공고</TotalCount>
      </Header>
      <Divider />

      {loading ? (
        <Message>로딩 중...</Message>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : announcements.length > 0 ? (
        <Grid>
          {announcements.map(item => (
            <Card key={item.postId}>
              <Image src={item.attachedImage || 'https://via.placeholder.com/140'} alt="공고 이미지" />
              <AnnouncementTitle>{item.title}</AnnouncementTitle>
              <Details>
                <Institution>{item.beneficiaryName}</Institution>
                <Status>{item.approvalStatus === 'APPROVED' ? '승인됨' : '대기 중'}</Status>
              </Details>
            </Card>
          ))}
        </Grid>
      ) : (
        <Message>등록된 공고가 없습니다.</Message>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
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
          <PageButton disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
            다음
          </PageButton>
        </Pagination>
      )}
    </Container>
  );
};

export default AnnouncementHistory;

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
  font-size: 36px;
  font-weight: 600;
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
  margin: 20px 0 30px;
`;

const Message = styled.div`
  text-align: center;
  color: #555;
  margin: 20px 0;
`;

const ErrorMessage = styled(Message)`
  color: #e74c3c;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

const Card = styled.div`
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

const AnnouncementTitle = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #555;
`;

const Institution = styled.div``;

const Status = styled.div``;

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

const PageNumber = styled(PageButton)<{active: boolean}>`
  background-color: ${({active}) => (active ? '#3e5879' : 'transparent')};
  color: ${({active}) => (active ? 'white' : '#3e5879')};
  border: 1px solid #3e5879;

  &:hover:enabled {
    background-color: #3e5879;
    color: white;
  }
`;
