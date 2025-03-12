import React, { useState } from 'react';
import styled from 'styled-components';

const announcements = [
  { institution: '자연보육원' },
  { institution: '자연보육원' },
  { institution: '자연보육원' },
  { institution: '자연보육원' },
  { institution: '자연보육원' },
  { institution: '자연보육원' },
];

const mockSupporters = [
  { name: '김ㅇㅇ', email: '800@naver.com', phone: '010-0000-0000' },
  { name: '김ㅇㅇ', email: '800@naver.com', phone: '010-0000-0000' },
  { name: '김ㅇㅇ', email: '800@naver.com', phone: '010-0000-0000' },
  { name: '김ㅇㅇ', email: '800@naver.com', phone: '010-0000-0000' },
];

const AnnouncementList = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedAnnouncement(index);
  };

  const handleCloseSupporters = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <Container>
      <Header>
        <Title>공고 현황</Title>
        <TotalCount>
          <CountNumber>100</CountNumber>개의 기관
        </TotalCount>
      </Header>
      <Divider />
      <ContentWrapper>
        <AnnouncementGrid>
          {announcements.map((announcement, index) => (
            <AnnouncementCard key={index}>
              <ImagePlaceholder onClick={() => handleImageClick(index)} />
              <InstitutionName>{announcement.institution}</InstitutionName>
            </AnnouncementCard>
          ))}
        </AnnouncementGrid>

        {selectedAnnouncement !== null && (
          <SupporterPanel>
            <PanelHeader>
              <PanelTitle>후원자 목록</PanelTitle>
              <CloseButton onClick={handleCloseSupporters}>X</CloseButton>
            </PanelHeader>
            <SupporterList>
              {mockSupporters.map((supporter, index) => (
                <SupporterItem key={index}>
                  <ProfileImage />
                  <SupporterInfo>
                    <div>이름: {supporter.name}</div>
                    <div>이메일: {supporter.email}</div>
                    <div>전화번호: {supporter.phone}</div>
                  </SupporterInfo>
                </SupporterItem>
              ))}
            </SupporterList>
          </SupporterPanel>
        )}
      </ContentWrapper>
      <Pagination>
        {[...Array(10)].map((_, index) => (
          <PageNumber key={index}>{index + 1}</PageNumber>
        ))}
      </Pagination>
    </Container>
  );
};

export default AnnouncementList;

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
  font-size: 33px;
  font-weight: Semibold;
  color: #3e5879;
  margin: 0;
  text-align: center;
  width: 90%;
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

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const AnnouncementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  flex: 1;
`;

const AnnouncementCard = styled.div`
  padding: 20px;
  background-color: #f0f3f8;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c0c7d6;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const InstitutionName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #3e5879;
`;

const SupporterPanel = styled.div`
  width: 250px;
  background-color: #f0f3f8;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto;
  max-height: 400px;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PanelTitle = styled.div`
  font-weight: bold;
  color: #3e5879;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const SupporterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SupporterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c0c7d6;
`;

const SupporterInfo = styled.div`
  font-size: 12px;
  color: #333;
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
