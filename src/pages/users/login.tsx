import styled from "styled-components";
import Navigation from "../../components/Navigation";
import { useState } from "react";

const LoginForm = () => {
  const api = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handleLogin = async () => {
    try {
      const client = await fetch(`${api}users/sign-in`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!client.ok) {
        throw new Error(`Server responded with status ${client.status}`);
      }
      const data = await client.json();
      if (data.isSuccess) {
        localStorage.setItem("accessToken", data.result.accessToken);
        alert("로그인 성공 !");
      } else {
        console.error("로그인 실패:", data.message);
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
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
        <Main>
          <Form>
            <Title>로그인</Title>
            <Input
              type="email"
              value={email}
              onChange={handleEmail}
              placeholder="이메일을 입력하세요"
            />
            <Input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="비밀번호를 입력하세요"
            />
            <SubmitButton onClick={handleLogin}>로그인</SubmitButton>
          </Form>
        </Main>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

export default LoginForm;
