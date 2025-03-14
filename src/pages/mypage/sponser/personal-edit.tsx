//fund
import { useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";

// 메인 컴포넌트
const PersonalEditPage = () => {
  //const api = import.meta.env.VITE_API_URL;
  const [documents] = useState<string[]>([
    "스크랩",
    "참여한 펀딩",
    "참여한 봉사",
    "개인정보 수정",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <Container>
        {/* 왼쪽 사이드바 */}
        <Sidebar>
          <ButtonWrapper>마이페이지</ButtonWrapper>
          <DocumentList>
            {documents.map((doc, index) => (
              <DocumentItem
                key={index}
                active={activeDoc === doc}
                onClick={() => setActiveDoc(doc)}
              >
                {doc}
              </DocumentItem>
            ))}
          </DocumentList>
        </Sidebar>
        <MainContent>
          <FormWrapper>
            <Title>개인정보 수정</Title>
            <CardImage />

            <InputWrapper>
              <Subtitle>이름</Subtitle>
              <Input
                type="text"
                name="name"
                placeholder="이름을 입력해주세요."
              />
            </InputWrapper>

            <InputWrapper>
              <Subtitle>이메일</Subtitle>
              <Input
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요."
              />
            </InputWrapper>

            <InputWrapper>
              <Subtitle>비밀번호</Subtitle>
              <Input
                type="text"
                name="password"
                placeholder="비밀번호를 입력해주세요."
              />
            </InputWrapper>

            <InputWrapper>
              <Subtitle>연락처</Subtitle>
              <Input
                type="text"
                name="phonenumber"
                placeholder="연락처를 입력해주세요. ex) 010-1234-5678"
              />
            </InputWrapper>

            <InputWrapper>
              <Subtitle>주소</Subtitle>
              <Input
                type="text"
                name="address"
                placeholder="주소를 입력해주세요. ex) 서울시 종로구 낙산길 198"
              />
            </InputWrapper>

            <Button>수정완료</Button>
          </FormWrapper>
        </MainContent>
      </Container>
    </>
  );
};

export default PersonalEditPage;
// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  font-family: Pretendard, sans-serif;
`;
const Sidebar = styled.div`
  width: 250px;
  background-color: #3e5879;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
`;
const DocumentList = styled.ul`
  list-style: none;
  border-bottom: 2px solid #ffffff;
  padding: 0;
  margin-top: 100px;
  width: 250px;
`;
interface DocumentItemProps {
  active: boolean;
}

const DocumentItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<DocumentItemProps>`
  background-color: ${({ active }) => (active ? "#3e5879" : "#3e5879")};
  cursor: pointer;
  &:hover {
    background-color: #adacc2;
  }
  border-top: 2px solid white;
  height: 55px;
`;
/* 메인 콘텐츠 */
const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const FormWrapper = styled.div`
  width: 50%;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #3e5879;
`;

const InputWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const Subtitle = styled.div`
  color: #3e5879;
  display: flex;
  margin-left: 8px;
  margin-bottom: 5px;
  font-family: "Pretandard", sans-serif;
  font-weight: bold;
  justify-content: flex-start;
`;

const Input = styled.input`
  width: 90%;
  height: 20px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #9a9ebe;
  border-radius: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  padding: 10px;
  background: #3e5879;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;

  &:hover {
    background: #3e5879;
  }
  font-family: "Pretandard", sans-serif;
`;

const CardImage = styled.div`
  width: 150px;
  height: 150px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;
