import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import image from "../../assets/just_image.svg";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #333;
`;

const FormWrapper = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-stripe: 0 4px 6px rgb(23, 24, 32);
  width: 400px;
  text-align: center;
  color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const ToggleGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  background: #5e6879;
  border-radius: 5px;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background: ${(props) => (props.active ? "#2c3e50" : "transparent")};
  color: #fff;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #3e5879;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #3e5879;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #3e5879;
  }
`;

const SignupForm = () => {
  const [role, setRole] = useState("후원자");

  return (
    <Container>
      <FormWrapper>
        <Title>회원가입</Title>
        <ToggleGroup>
          <ToggleButton
            active={role === "수혜자"}
            onClick={() => setRole("수혜자")}
          >
            수혜자
          </ToggleButton>
          <ToggleButton
            active={role === "후원자"}
            onClick={() => setRole("후원자")}
          >
            후원자
          </ToggleButton>
        </ToggleGroup>
        <Input type="text" placeholder="이름을 입력해주세요." />
        <Input type="email" placeholder="이메일을 입력해주세요." />
        <Input type="password" placeholder="비밀번호를 입력해주세요." />
        <Input
          type="tel"
          placeholder="연락처를 입력해주세요. ex) 010-1234-5678"
        />
        <Input
          type="text"
          placeholder="주소를 입력해주세요. ex) 서울시 종로구 낙산길 198"
        />
        <Button>회원가입</Button>
      </FormWrapper>
    </Container>
  );
};

export default SignupForm;
