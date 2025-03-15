import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const AnnouncementHistory = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const beneficiaryId = localStorage.getItem('beneficiaryId');

  useEffect(() => {
    if (!beneficiaryId) return;

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `https://your-api.com/beneficiaries/posts/${beneficiaryId}`
        );

        if (response.data.isSuccess) {
          setAnnouncements(response.data.result.postList);
        }
      } catch (error) {
        console.error('Error fetching announcement history:', error);
      }
    };

    fetchAnnouncements();
  }, [beneficiaryId]);

  return (
    <Container>
      <Header>
        <Title>공고 현황</Title>
        <TotalCount>
          <CountNumber>{announcements.length}</CountNumber>개의 공고
        </TotalCount>
      </Header>
      <Divider />
      {announcements.length > 0 ? (
        <AnnouncementGrid>
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.postId}>
              <Image src={announcement.attachedImage || "https://via.placeholder.com/140"} alt="공고 이미지" />
              <AnnouncementTitle>{announcement.title}</AnnouncementTitle>
              <AnnouncementDetails>
                <Institution>{announcement.beneficiaryName}</Institution>
                <Status>{announcement.approvalStatus === 'APPROVED' ? '승인됨' : '대기 중'}</Status>
              </AnnouncementDetails>
            </AnnouncementCard>
          ))}
        </AnnouncementGrid>
      ) : (
        <NoAnnouncementMessage>등록된 공고가 없습니다.</NoAnnouncementMessage>
      )}
      <Pagination>
        {[...Array(10)].map((_, index) => (
          <PageNumber key={index}>{index + 1}</PageNumber>
        ))}
      </Pagination>
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

const AnnouncementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;

const AnnouncementCard = styled.div`
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

const AnnouncementDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #555;
`;

const Institution = styled.div``;

const Status = styled.div``;

const NoAnnouncementMessage = styled.div`
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