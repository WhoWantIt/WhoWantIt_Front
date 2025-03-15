import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../../utils/api";
import { AxiosError } from "axios";
import Navigation from "../../../components/Navigation";

const PersonalEditPage = () => {
  const navigate = useNavigate();
  const [documents] = useState<string[]>([
    "스크랩",
    "참여한 펀딩",
    "참여한 봉사",
    "마이페이지",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  const handleNavigation = (doc: string) => {
    setActiveDoc(doc);
    const routes: { [key: string]: string } = {
      스크랩: "/sponser/scrap/funding",
      "참여한 펀딩": "/sponser/funding",
      "참여한 봉사": "/sponser/volunteer",
      마이페이지: "/sponser/mypage",
    };
    navigate(routes[doc]);
  };
  const [formData, setFormData] = useState({
    nickname: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [originalData, setOriginalData] = useState({
    nickname: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/my/info", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setFormData(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error(
          "사용자 정보 불러오기 실패:",
          (error as AxiosError).message,
        );
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("보낼 데이터:", formData);
    const cleanedFormData = {
      nickname: formData.nickname || originalData.nickname,
      name: formData.name || originalData.name,
      email: formData.email || originalData.email,
      password: formData.password || originalData.password,
      phoneNumber: formData.phoneNumber || originalData.phoneNumber,
      address: formData.address || originalData.address,
    };

    try {
      const response = await api.put(
        "/my/info",
        JSON.stringify(cleanedFormData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );

      console.log("응답 데이터:", response.data);
      navigate("/sponser/mypage");
    } catch (error: AxiosError | any) {
      console.error(
        "개인정보 수정 실패:",
        error.response?.data || error.message,
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!image) return;
    const imageFormData = new FormData();
    imageFormData.append("images", image);
    try {
      const response = await api.put("/my/info/images", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("이미지 업로드 성공:", response.data);
    } catch (error: AxiosError | any) {
      console.error(
        "이미지 업로드 실패:",
        error.response?.data || error.message,
      );
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        <Sidebar>
          <ButtonWrapper>마이페이지</ButtonWrapper>
          <DocumentList>
            {documents.map((doc, index) => (
              <DocumentItem
                key={index}
                active={activeDoc === doc}
                onClick={() => handleNavigation(doc)}
              >
                {doc}
              </DocumentItem>
            ))}
          </DocumentList>
        </Sidebar>
        <MainContent>
          <FormWrapper>
            <Title>개인정보 수정</Title>
            <CardImage
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              {previewImage ? (
                <img src={previewImage} alt="미리보기" />
              ) : (
                "사진 추가"
              )}
            </CardImage>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <InputWrapper>
              <Subtitle>닉네임</Subtitle>
              <Input
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주세요."
                value={formData.nickname}
                onChange={handleInputChange}
              />
            </InputWrapper>

            <InputWrapper>
              <Subtitle>이름</Subtitle>
              <Input
                type="text"
                name="name"
                placeholder="이름을 입력해주세요."
                value={formData.name}
                onChange={handleInputChange}
              />
            </InputWrapper>

            <InputWrapper>
              <Subtitle>이메일</Subtitle>
              <Input
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요."
                value={formData.email}
                onChange={handleInputChange}
              />
            </InputWrapper>

            <InputWrapper>
              <Subtitle>비밀번호</Subtitle>
              <Input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={handleInputChange}
              />
            </InputWrapper>

            <InputWrapper>
              <Subtitle>연락처</Subtitle>
              <Input
                type="text"
                name="phoneNumber"
                placeholder="연락처를 입력해주세요."
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </InputWrapper>

            <InputWrapper>
              <Subtitle>주소</Subtitle>
              <Input
                type="text"
                name="address"
                placeholder="주소를 입력해주세요."
                value={formData.address}
                onChange={handleInputChange}
              />
            </InputWrapper>

            <Button
              onClick={async () => {
                await handleSubmit();
                await uploadImage();
              }}
            >
              수정완료
            </Button>
          </FormWrapper>
        </MainContent>
      </Container>
    </>
  );
};

export default PersonalEditPage;

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
  margin-top: 50px;
  font-size: 25px;
  font-weight: bold;
`;

const DocumentList = styled.ul`
  list-style: none;
  border-bottom: 1px solid #ffffff;
  padding: 0;
  margin-top: 50px;
  width: 250px;
`;
interface DocumentItemProps {
  active: boolean;
}

const DocumentItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<DocumentItemProps>`
  background-color: ${({ active }) => (active ? "#adacc2" : "#3e5879")};
  cursor: pointer;
  &:hover {
    background-color: #adacc2;
  }
  border-top: 1px solid #ffffff;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
`;

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
  font-weight: bold;
`;

const Input = styled.input`
  width: 90%;
  height: 20px;
  padding: 10px;
  border: 1px solid #9a9ebe;
  border-radius: 5px;
  font-size: 14px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  background: #3e5879;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 30px;
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
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
