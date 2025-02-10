import styled from "styled-components";
import Navigation from "../../components/Navigation";

const LoginForm = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Main>
          <Form>
            <Title>로그인</Title>
            <Input type="email" placeholder="이메일을 입력하세요" />
            <Input type="password" placeholder="비밀번호를 입력하세요" />
            <SubmitButton>로그인</SubmitButton>
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

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SignUpButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  border: none;

  &:hover {
    background-color: #2563eb;
  }
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
