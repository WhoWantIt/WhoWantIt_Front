import React, { useState } from 'react';
import styled from 'styled-components';

type AgeGroup = 'infant' | 'child' | 'teen' | 'youth';

interface ProfileType {
  name: string;
  phone: string;
  address: string;
  description: string;
  residents: Record<AgeGroup, number>;
}

const initialProfile: ProfileType = {
  name: '자연보육원',
  phone: '010-1234-5678',
  address: '서울시 종로구 낙산길 198',
  description: '',
  residents: {
    infant: 0,
    child: 0,
    teen: 0,
    youth: 0,
  },
};

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleEditClick = () => setIsEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('resident-')) {
      const ageGroup = name.split('-')[1] as AgeGroup;
      setProfile((prev) => ({
        ...prev,
        residents: { ...prev.residents, [ageGroup]: Number(value) },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Container>
      <Header>
        <ImagePlaceholder />
        <ProfileInfo>
          <Name>{profile.name}</Name>
          <Info><Label>연락처</Label>{profile.phone}</Info>
          <Info><Label>주소</Label>{profile.address} <MapButton onClick={() => setShowMap(!showMap)}>위치</MapButton></Info>
        </ProfileInfo>
      </Header>

      {showMap && (
        <MapContainer>
          <img src="https://via.placeholder.com/300x200?text=Map" alt="지도" />
        </MapContainer>
      )}

      <ContentRow>
        <Section>
          <SectionTitle>기관 소개</SectionTitle>
          {isEditing ? (
            <Textarea name="description" value={profile.description} onChange={handleChange} placeholder="기관 소개를 작성해주세요." />
          ) : (
            <Description>{profile.description || '작성한 기관 소개가 없습니다.'}</Description>
          )}
        </Section>

        <Section>
          <SectionTitle>원생 현황</SectionTitle>
          {isEditing ? (
            <ResidentForm>
              {Object.entries(profile.residents).map(([key, value]) => (
                <ResidentInput key={key}>
                  <span>{ageGroupLabel(key as AgeGroup)}</span>
                  <input
                    type="number"
                    name={`resident-${key}`}
                    value={value}
                    onChange={handleChange}
                    min="0"
                  />
                  <span>명</span>
                </ResidentInput>
              ))}
            </ResidentForm>
          ) : (
            <ResidentChart>
              {Object.entries(profile.residents).map(([key, value]) => (
                <ResidentBar key={key}>
                  <BarHeight style={{ height: `${value * 5}px` }} />
                  <BarLabel>{ageGroupLabel(key as AgeGroup)}<br />{value}명</BarLabel>
                </ResidentBar>
              ))}
            </ResidentChart>
          )}
        </Section>
      </ContentRow>

      {isEditing ? (
        <SaveButton onClick={handleSave}>저장</SaveButton>
      ) : (
        <EditButton onClick={handleEditClick}>상세 정보 추가</EditButton>
      )}
    </Container>
  );
};

const ageGroupLabel = (key: AgeGroup) => {
  const labels: Record<AgeGroup, string> = {
    infant: '영유아 (0~6세)',
    child: '어린이 (7~12세)',
    teen: '청소년 (13~19세)',
    youth: '자립준비청년 (18~24세)',
  };
  return labels[key];
};

export default Profile;

const Container = styled.div`
  padding: 20px;
  font-family: Pretendard, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const ImagePlaceholder = styled.div`
  width: 490px;
  height: 326px;
  background-color: #c0c7d6;
  border-radius: 8px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Info = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const MapButton = styled.button`
  font-size: 12px;
  padding: 2px 5px;
  cursor: pointer;
`;

const MapContainer = styled.div`
  margin-top: 10px;
`;

const ContentRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const Section = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Description = styled.div`
  font-size: 14px;
  color: #555;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  resize: none;
`;

const ResidentForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ResidentInput = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ResidentChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
`;

const ResidentBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const BarHeight = styled.div`
  width: 30px;
  background-color: #3e5879;
`;

const BarLabel = styled.div`
  font-size: 12px;
  text-align: center;
`;

const EditButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #3e5879;
  color: white;
  border: none;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
`;
