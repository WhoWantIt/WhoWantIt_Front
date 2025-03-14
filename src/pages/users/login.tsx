import styled from "styled-components";
import Navigation from "../../components/Navigation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Email 입력:", value);
    setEmail(value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("Password 입력:", value);
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
        localStorage.setItem("email", email);
        alert("로그인 성공 !");
        const userResponse = await fetch(`${api}users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.result.accessToken}`,
          },
        });
        if (!userResponse.ok) {
          throw new Error(
            `User info request failed with status ${userResponse.status}`,
          );
        }
        const userInfo = await userResponse.json();
        localStorage.setItem("id", userInfo.result.id);
        localStorage.setItem("name", userInfo.result.name);
        localStorage.setItem("role", userInfo.result.role);
        localStorage.setItem("role", userInfo.result.role);
        localStorage.setItem("nickname", userInfo.result.nickname);
        localStorage.setItem("passward", userInfo.result.passward);
        localStorage.setItem("email", userInfo.result.email);
        localStorage.setItem("phoneNumber", userInfo.result.phoneNumber);
        localStorage.setItem("address", userInfo.result.address);
        localStorage.setItem("Image", userInfo.result.image);
        navigate("/");
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
          <Title>로그인</Title>
          <Subtitle>이메일</Subtitle>
          <Input
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="이메일을 입력하세요"
          />
          <Subtitle>비밀번호</Subtitle>
          <Input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="비밀번호를 입력하세요"
          />
          <SubmitButton onClick={handleLogin}>로그인</SubmitButton>
        </Main>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Main = styled.div`
  background: #fcfcfc;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #9a9ebe;
  box-stripe: 0 4px 6px rgb(23, 24, 32);
  width: 500px;
  height: 400px;
  text-align: center;
  color: #fff;
  margin-top: -40px;
`;

const Title = styled.h2`
  margin-bottom: 50px;
  color: #3e5879;
  font-family: "Pretandard", sans-serif;
  font-weight: bold;
`;
//추후 focus
const Input = styled.input`
  width: 90%;
  padding: 10px;
  border: 1px solid #9a9ebe;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  width: 130px;
  padding: 10px;
  background: #3e5879;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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

export default LoginForm;
