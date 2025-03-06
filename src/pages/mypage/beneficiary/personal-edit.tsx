import React, { useState } from 'react';
import styled from 'styled-components';

const PersonalEdit = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [image, setImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    console.log('수정 완료:', form);
  };

  return (
    <Container>
      <Title>개인정보 수정</Title>
      <ImageContainer>
        {image ? (
          <>
            <ImagePreview src={image} alt="프로필 이미지" />
            <DeleteButton onClick={handleImageDelete}>삭제</DeleteButton>
          </>
        ) : (
          <ImagePlaceholder>
            <ImageUploadLabel>
              이미지 등록
              <ImageInput type="file" accept="image/*" onChange={handleImageChange} />
            </ImageUploadLabel>
          </ImagePlaceholder>
        )}
      </ImageContainer>

      <Form>
        <Label>기관명</Label>
        <Input name="name" value={form.name} onChange={handleChange} placeholder="기관명을 입력해주세요." />

        <Label>이메일</Label>
        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="이메일을 입력해주세요." />

        <Label>비밀번호</Label>
        <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="비밀번호를 입력해주세요." />

        <Label>연락처</Label>
        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="연락처를 입력해주세요. ex) 010-1234-5678" />

        <Label>주소</Label>
        <Input name="address" value={form.address} onChange={handleChange} placeholder="주소를 입력해주세요. ex) 서울시 종로구 낙산길 198" />

        <SubmitButton onClick={handleSubmit}>수정 완료</SubmitButton>
      </Form>
    </Container>
  );
};

export default PersonalEdit;

const Container = styled.div`
  padding: 40px;
  font-family: Pretendard, sans-serif;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #3e5879;
`;

const ImageContainer = styled.div`
  width: 540px;
  height: 171px;
  background-color: #f0f0f0;
  border: 1px solid #d1d8e0;
  border-radius: 10px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7a7a7a;
`;

const ImageUploadLabel = styled.label`
  cursor: pointer;
  font-weight: bold;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff5a5a;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #ff0000;
  }
`;

const Form = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #3e5879;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d8e0;
  border-radius: 5px;
  font-size: 14px;
  &::placeholder {
    color: #a0a5aa;
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 0;
  background-color: #3e5879;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background-color: #2c3e50;
  }
`;
