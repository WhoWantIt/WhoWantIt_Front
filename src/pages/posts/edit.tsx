import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import { getUserRole } from "../../utils/jwt";

const PostEdit = () => {
  const [title, setTitle] = useState<string>("");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const editorRef = useRef<Editor>(null);
  const userRole = getUserRole();

  useEffect(() => {
    if (userRole !== "BENEFICIARY") {
      alert("게시글 작성 권한이 없습니다.");
      window.location.href = "/";
    }
  }, [userRole]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setExcelFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !editorRef.current) return;
    const content = editorRef.current.getInstance().getMarkdown();
    const formData = new FormData();
    formData.append(
      "postRequestDto",
      new Blob([JSON.stringify({ title, content })], {
        type: "application/json",
      }),
    );
    images.forEach((image) => formData.append("images", image));
    if (excelFile) formData.append("excelFile", excelFile);

    try {
      const response = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("게시글이 성공적으로 등록되었습니다.");
      window.location.href = `/posts/${response.data.result.postId}`;
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        <EditorContainer>
          <TitleInput
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor
            ref={editorRef}
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "link"],
              ["code", "codeblock"],
            ]}
            height="500px"
            initialEditType="wysiwyg"
            previewStyle="vertical"
            initialValue="내용을 입력해주세요."
          />
          <FileInput
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <FileInput
            type="file"
            accept=".xlsx, .xls"
            onChange={handleExcelUpload}
          />
          <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
        </EditorContainer>
      </Container>
      <Footer />
    </>
  );
};

export default PostEdit;

const Container = styled.div`
  display: flex;
  height: auto;
  font-family: Pretendard, sans-serif;
`;
const EditorContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;
const TitleInput = styled.input`
  font-size: 30px;
  padding: 10px;
  margin-bottom: 10px;
  width: 58%;
  height: 70px;
  border: none;
  border-bottom: 1px solid;
`;
const FileInput = styled.input`
  margin-top: 20px;
`;
const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  color: white;
`;
