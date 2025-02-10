import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  background-color: #34495e;
  color: white;
  border: none;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #1abc9c;
  }
`;
const DocumentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 10px;
`;
interface DocumentItemProps {
  active: boolean;
};

const DocumentItem = styled.li<DocumentItemProps>`
  padding: 10px;
  background-color: ${({ active }) => (active ? "#1abc9c" : "#34495e")};
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #1abc9c;
  }
`;

const EditorContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  font-size: 24px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const QuillEditor = styled(ReactQuill)`
  height: 100%;
`;

const SidebarRight = styled.div`
  width: 250px;
  background-color: #ecf0f1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const FieldContainer = styled.div`
  margin-bottom: 20px;
`;

const FieldTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

interface TagButtonProps {
  selected: boolean;
}

const TagButton = styled.button<TagButtonProps>`
  background-color: ${({ selected }) => (selected ? "#1abc9c" : "#bdc3c7")};
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #16a085;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PostButton = styled.button`
  width: 129px;
  height: 54px;
  background-color: #3e5879;
`;

// 메인 컴포넌트
const EditorPage: React.FC = () => {
  const [documents, setDocuments] = useState<string[]>(["파일1", "파일2", "파일3"]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [participants, setParticipants] = useState<string>("");

  const tags: string[] = [
    "생활편의지원",
    "주거환경",
    "상담",
    "교육",
    "보건의료",
    "문화행사",
    "환경보호",
    "재해 · 재난",
    "공익인권",
    "멘토링",
    "기타"
  ];
  
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <Container>
      {/* 왼쪽 사이드바 */}
      <Sidebar>
        <Button onClick={() => alert("삭제 기능")}>삭제</Button>
        <Button onClick={() => alert("저장 기능")}>저장</Button>
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <QuillEditor value={content} onChange={setContent} />
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
            selected={startDate}
            onClick={(date: Date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </FieldContainer>

        <FieldContainer>
          <FieldTitle>모집 인원</FieldTitle>
          <InputField
            type="number"
            placeholder="모집할 인원 수를 정해주세요! (최대 100명)"
            value={participants}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParticipants(e.target.value)}
          />
        </FieldContainer>
      </SidebarRight>
    </Container>
  );
};

export default EditorPage;
