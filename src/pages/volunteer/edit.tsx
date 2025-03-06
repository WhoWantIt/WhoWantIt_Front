import React, { useState, useRef } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// 메인 컴포넌트
const EditPage = () => {
  const api = import.meta.env.VITE_API_URL;
  const editorRef = useRef<Editor>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [deadLineDate, setDeadLineDate] = useState<Date | null>(null);
  const [participant, setParticipant] = useState<string>("");
  //const [body, setBody] = useState<string>("");
  const tags = [
    { name: "LIVING_SUPPORT", text: "생활편의지원" },
    { name: "HOUSING_ENVIRONMENT", text: "주거환경" },
    { name: "COUNSELING", text: "상담" },
    { name: "EDUCTION", text: "교육" },
    { name: "HEALTHCARE", text: "보건의료" },
    { name: "CULTURAL_EVENTS", text: "문화행사" },
    { name: "ENVIRONMENTAL_PROTECTION", text: "환경보호" },
    { name: "DISASTER_RELIEF", text: "재해·재난" },
    { name: "PUBLIC_INTEREST_RIGHTS", text: "공익인권" },
    { name: "MENTORING", text: "멘토링" },
    { name: "OTHERS", text: "기타" },
  ];
  /*
  const formatDate = (date: Date | null) =>
    date ? date.toISOString().split("T")[0] + "T00:00:00" : "";

  const onChangeGETString = () => {
    const data = editorRef.current?.getInstance().getHTML();
    setBody(data);
  };*/

  const handleIssue = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login"; // 로그인 페이지로 리디렉션
      return;
    }
    //json 형식
    const volunteerRequestDto = {
      nickname: "string",
      title: "string",
      field: "EDUCATION",
      content: "string",
      startTime: "2016-10-27T00:00:00",
      deadline: "2016-10-27T00:00:00",
      maxCapacity: 0,
    };
    console.log("volunteerRequestDto:", volunteerRequestDto);
    const formData = new FormData();
    formData.append(
      "volunteerRequestDto",
      new Blob([JSON.stringify(volunteerRequestDto)], {
        type: "application/json",
      }),
    );
    //file 형식
    const imageInput = document.getElementById(
      "imageInput",
    ) as HTMLInputElement;
    if (imageInput?.files && imageInput.files.length > 0) {
      Array.from(imageInput.files).forEach((file, index) => {
        formData.append(
          "images",
          new Blob([file], { type: file.type }),
          file.name,
        ); // 배열 형태로 전송
        console.log(`📂 images[${index}]:`, file.name);
      });
    } else {
      formData.append("images", "");
    }
    for (const [key, value] of formData.entries()) {
      console.log(`📄 FormData - ${key}:`, value);
    }
    try {
      console.log(formData);
      const client = await fetch(`${api}volunteers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (!client.ok) {
        throw new Error(`서버 응답 실패: ${client.status}`);
      }
      const data = await client.json();
      if (data.isSuccess) {
        alert("자원봉사 게시가 성공적으로 발행되었습니다.");
      } else {
        alert(`발행 실패: ${data.message}`);
      }
    } catch (error) {
      console.error("API 요청 중 오류:", error);
      alert("게시글 발행 중 오류가 발생했습니다.");
    }
  };
  //const onChangeGetHTML = () =>{};
  return (
    <>
      <Navigation />
      <Container>
        {/* 왼쪽 사이드바 */}
        {/* 중앙 편집기 */}
        <EditorContainer>
          <TitleInput
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Editor
            toolbarItems={[
              // 툴바 옵션 설정
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "image", "link"],
              ["code", "codeblock"],
            ]}
            height="500px" // 에디터 창 높이
            initialEditType="wysiwyg" // 기본 에디터 타입 (or wysiwyg)
            previewStyle="vertical" // 미리보기 스타일 (or tab) (verttical은 양쪽이 나뉨)
            initialValue="내용을 입력해주세요."
            ref={editorRef}
          ></Editor>
        </EditorContainer>

        {/* 오른쪽 사이드바 */}
        <SidebarRight>
          <PostButton onClick={handleIssue}>완료</PostButton>
          <FieldContainer>
            <FieldTitle>분야</FieldTitle>
            <TagContainer>
              {tags.map((tag, index) => (
                <TagButton
                  key={index}
                  selected={selectedTags.includes(tag.name)}
                  onClick={() => setSelectedTags(tag.name)}
                >
                  {tag.text}
                </TagButton>
              ))}
            </TagContainer>
          </FieldContainer>

          <FieldContainer>
            <FieldTitle>날짜 설정</FieldTitle>
            <DatePicker
              placeholderText="지원마감일"
              selected={deadLineDate}
              onChange={(date: Date | null) => setDeadLineDate(date)}
              dateFormat="yyyy.MM.dd"
            />
            <DatePicker
              placeholderText="봉사시작일"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="yyyy.MM.dd"
            />
          </FieldContainer>

          <FieldContainer>
            <FieldTitle>모집 인원</FieldTitle>
            <InputField
              type="number"
              placeholder="모집할 인원 수를 정해주세요! (최대 100명)"
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
            />
          </FieldContainer>
          <FieldContainer>
            <FieldTitle>이미지 업로드</FieldTitle>
            <input type="file" id="imageInput" multiple accept="image/*" />
          </FieldContainer>
        </SidebarRight>
      </Container>
      <Footer />
    </>
  );
};

export default EditPage;
// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  font-family: Pretendard, sans-serif;
  border: 2px solid #3e5879;
`;
const EditorContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  font-size: 30px;
  padding: 10px;
  margin-bottom: 10px;
  width: 99%;
  height: 70px;
  border: none;
`;

const SidebarRight = styled.div`
  width: 270px;
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-left: 2px solid black;
`;
const PostButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: #3e5879;
  border: none;
  border-radius: 10px;
  color: white;
  font-family: "Pretandard", sans-serif;
  font-size: 18px;
  margin-left: auto; /* 왼쪽 여백을 자동으로 설정하여 오른쪽으로 이동 */
  margin-bottom: 20px;
`;

const FieldContainer = styled.div`
  margin-bottom: 20px;
  font-family: "Pretandard", sans-serif;
  font-weight: bold;
  margin-right: 10px;
`;

const FieldTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  color: #3e5879;
`;

const TagContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  background: #f5f6f8;
  padding: 30px;
  border-radius: 10px;
  border: 1px solid #9a9ebe;
  box-stripe: 0 4px 6px rgb(23, 24, 32);
  text-align: center;
  color: #fff;
  margin-top: 0px;
  width: 100%;
  padding: 10px; 10px;
`;

interface TagButtonProps {
  selected: boolean;
}

const TagButton = styled.button<TagButtonProps>`
  background-color: ${({ selected }) => (selected ? "#c2c6cc" : "#f5f6f8")};
  color: white;
  border: 1px solid #3e5879;
  padding: 5px 10px;
  color: #3e5879;
  cursor: pointer;
  border-radius: 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #3e5879;
  border-radius: 10px;
`;
