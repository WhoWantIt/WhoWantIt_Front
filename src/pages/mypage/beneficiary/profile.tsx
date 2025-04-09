import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../../utils/api'; // axios 대신 api 사용!

type AgeGroup = 'toddler' | 'child' | 'adolescent' | 'youth';

interface ProfileType {
  beneficiaryName: string;
  phoneNumber: string;
  address: string;
  info: string;
  residents: Record<AgeGroup, number>;
  image?: string;
  email?: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const beneficiaryId = localStorage.getItem('beneficiaryId');

  useEffect(() => {
    if (!beneficiaryId) {
      console.error("beneficiaryId가 없습니다!");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/beneficiaries/profiles/${beneficiaryId}`); // ✅ api 사용

        console.log("API 응답:", response.data);

        if (response.data.isSuccess) {
          const data = response.data.result;
          setProfile({
            beneficiaryName: data.beneficiaryName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            info: data.info,
            email: data.email,
            image: data.image,
            residents: {
              toddler: data.toddler,
              child: data.child,
              adolescent: data.adolescent,
              youth: data.youth,
            },
          });
        } else {
          console.error("API는 성공했지만 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("프로필 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchProfile();
  }, [beneficiaryId]);
  
  const handleEditClick = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  return (
    <Container>
      {profile ? (
        <>
          <Header>
            {profile.image && <ProfileImage src={profile.image} alt="프로필 이미지" />}
            <ProfileInfo>
              <Name>{profile.beneficiaryName}</Name>
              <Info><Label>이메일</Label>{profile.email}</Info>
              <Info><Label>연락처</Label>{profile.phoneNumber}</Info>
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
              <Description>{profile.info || '작성한 기관 소개가 없습니다.'}</Description>
            </Section>

            <Section>
              <SectionTitle>원생 현황</SectionTitle>
              <ResidentChart>
                {Object.entries(profile.residents).map(([key, value]) => (
                  <ResidentBar key={key}>
                    <BarHeight style={{ height: `${value * 5}px` }} />
                    <BarLabel>{ageGroupLabel(key as AgeGroup)}<br />{value}명</BarLabel>
                  </ResidentBar>
                ))}
              </ResidentChart>
            </Section>
          </ContentRow>

          {isEditing ? (
            <SaveButton onClick={handleSave}>저장</SaveButton>
          ) : (
            <EditButton onClick={handleEditClick}>상세 정보 추가</EditButton>
          )}
        </>
      ) : (
        <p>프로필 정보를 불러오는 중...</p>
      )}
    </Container>
  );
};

const ageGroupLabel = (key: AgeGroup) => {
  const labels: Record<AgeGroup, string> = {
    toddler: '영유아 (0~6세)',
    child: '어린이 (7~12세)',
    adolescent: '청소년 (13~19세)',
    youth: '자립준비청년 (18~24세)',
  };
  return labels[key];
};

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;


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
