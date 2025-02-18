import React, { useState } from "react";
//import Navigation from "../../components/Navigation";
//import image from "../../assets/just_image.svg";
import styled from "styled-components";
import Navigation from "../../components/Navigation";

const SignupForm = () => {
  const api = import.meta.env.VITE_API_URL;
  const [role, setRole] = useState<"SPONSOR" | "BENEFICIARY">("BENEFICIARY");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handleNickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
  };
  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };
  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddress(value);
  };

  const handleSubmit = async () => {
    try {
      console.log(name);
      console.log(role);
      const client = await fetch(`${api}users/sign-up`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: "name",
          role: "SPONSOR",
          nickname: "nickname",
          password: "password",
          email: "email",
          phoneNumber: "phoneNumber",
          address: "address",
        }),
      });
      if (!client.ok) {
        throw new Error(`Server responded with status ${client.status}`);
      }
      const data = await client.json();

      if (data.isSuccess) {
        alert("회원가입이 완료되었습니다.");
      } else {
        console.error("회원가입 실패:", data.message);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("서버와의 연결에 문제가 발생했습니다.");
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        <FormWrapper>
          <Title>회원가입</Title>
          <Subtitle>직함</Subtitle>
          <ToggleGroup>
            <ToggleButton
              active={role === "BENEFICIARY"}
              onClick={() => setRole("BENEFICIARY")}
            >
              수혜자
            </ToggleButton>
            <ToggleButton
              active={role === "SPONSOR"}
              onClick={() => setRole("SPONSOR")}
            >
              후원자
            </ToggleButton>
          </ToggleGroup>
          <Subtitle>이름</Subtitle>
          <Input
            type="text"
            inputMode="numeric"
            name="name"
            value={name}
            placeholder="이름을 입력해주세요."
            onChange={handleNameChange}
          />
          <Subtitle>닉네임</Subtitle>
          <Input
            type="text"
            name="nickname"
            value={nickname}
            placeholder="닉네임을 입력해주세요."
            onChange={handleNickChange}
          />
          <Subtitle>이메일</Subtitle>
          <Input
            type="text"
            name="email"
            value={email}
            placeholder="이메일을 입력해주세요."
            onChange={handleEmailChange}
          />
          <Subtitle>비밀번호</Subtitle>
          <Input
            type="text"
            name="password"
            value={password}
            placeholder="비밀번호를 입력해주세요."
            onChange={handlePassChange}
          />
          <Subtitle>연락처</Subtitle>
          <Input
            type="text"
            name="phonenumber"
            value={phoneNumber}
            placeholder="연락처를 입력해주세요. ex) 010-1234-5678"
            onChange={handlePhoneChange}
          />
          <Subtitle>주소</Subtitle>
          <Input
            type="text"
            name="address"
            value={address}
            placeholder="주소를 입력해주세요. ex) 서울시 종로구 낙산길 198"
            onChange={handleAddChange}
          />
          <Button onClick={handleSubmit}>회원가입</Button>
        </FormWrapper>
      </Container>
    </>
  );
};

export default SignupForm;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const FormWrapper = styled.div`
  background: #fcfcfc;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #9a9ebe;
  box-stripe: 0 4px 6px rgb(23, 24, 32);
  width: 500px;
  text-align: center;
  color: #fff;
  margin-top: -40px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #3e5879;
  font-family: "Pretandard", sans-serif;
  font-weight: bold;
`;

const ToggleGroup = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
  margin-bottom: 15px;
  border-radius: 5px;
`;
interface ToggleButtonProps {
  active: boolean;
}
const ToggleButton = styled.button<ToggleButtonProps>`
  width: 47%;
  padding: 10px;
  border: none;
  background: ${(props) => (props.active ? "#2c3e50" : "#ffffff")};
  color: #d0d7d6;
  cursor: pointer;
  border: 1px solid #9a9ebe;
  border-radius: 5px;

  &:hover {
    background: #3e5879;
  }
  font-family: "Pretandard", sans-serif;
  font-weight: bold;
  font-size: 16px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #9a9ebe;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 130px;
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
  font-family: "Pretandard", sans-serif;
`;
const Subtitle = styled.div`
  color: #3e5879;
  display: flex;
  margin-left: 15px;
  margin-bottom: 5px;
  font-family: "Pretandard", sans-serif;
  font-weight: bold;
`;
