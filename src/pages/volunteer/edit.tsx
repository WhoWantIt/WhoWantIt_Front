import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// 메인 컴포넌트
const EditPage = () => {
  //const api = import.meta.env.VITE_API_URL;
  const [documents] = useState<string[]>([
    "짜장면 먹는날",
    "마크정식 먹는날",
    "곱도리탕 먹는닐",
    "집밥 먹는날",
    "햄버거 먹는날",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [deadLineDate, setDeadLineDate] = useState<Date | null>(null);
  const [participants] = useState<string>("");

  //const onChangeGetHTML = () =>{};
  const tags: string[] = [
    "생활편의지원",
    "주거환경",
    "상담",
    "교육",
    "보건의료",
    "문화행사",
    "환경보호",
    "재해·재난",
    "공익인권",
    "멘토링",
    "기타",
  ];
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };
  return (
    <>
      <Container>
        {/* 왼쪽 사이드바 */}
        <Sidebar>
          <ButtonWrapper>
            <Button onClick={() => alert("삭제 기능")}>삭제</Button>
            <Button onClick={() => alert("저장 기능")}>저장</Button>
          </ButtonWrapper>
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
            initialEditType="markdown" // 기본 에디터 타입 (or wysiwyg)
            previewStyle="vertical" // 미리보기 스타일 (or tab) (verttical은 양쪽이 나뉨)
          ></Editor>
        </EditorContainer>

        {/* 오른쪽 사이드바 */}
        <SidebarRight>
          <PostButton>발행</PostButton>
          <FieldContainer>
            <FieldTitle>분야</FieldTitle>
            <TagContainer>
              {tags.map((tag, index) => (
                <TagButton
                  key={index}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
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
              value={participants}
            />
          </FieldContainer>
        </SidebarRight>
      </Container>
    </>
  );
};

export default EditPage;
// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
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
const Button = styled.button`
  background-color: #ffffff;
  color: black;
  font-size: bold;
  border: none;
  padding: 1px;
  maom: 10prgin-bottx;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #3e5879;
  }
  width: 100px;
  height: 38px;
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

const EditorContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  font-size: 40px;
  padding: 10px;
  margin-bottom: 10px;
  width: 97%;
  height: 80px;
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
