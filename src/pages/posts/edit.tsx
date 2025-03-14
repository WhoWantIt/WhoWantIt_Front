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
  const [excelFileName, setExcelFileName] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
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
      const files = Array.from(e.target.files);
      setImages(files);

      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setExcelFile(file);
      setExcelFileName(file.name);
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
          <Title
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

          <FileUploadContainer>
            <UploadSection>
              <label>
                <FileInputLabel htmlFor="imageUpload">
                  이미지 선택
                </FileInputLabel>
                <HiddenFileInput
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            </UploadSection>
            <PreviewSection>
              {imagePreviews.map((src, index) => (
                <PreviewImage key={index} src={src} alt={`preview-${index}`} />
              ))}
            </PreviewSection>
          </FileUploadContainer>

          <FileUploadContainer>
            <UploadSection>
              <label>
                <FileInputLabel htmlFor="excelUpload">
                  엑셀파일 선택
                </FileInputLabel>
                <HiddenFileInput
                  id="excelUpload"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleExcelUpload}
                />
              </label>
            </UploadSection>
            <PreviewSection>
              {excelFileName && <FileName>{excelFileName}</FileName>}
            </PreviewSection>
          </FileUploadContainer>

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

const Title = styled.input`
  font-size: 30px;
  padding: 10px;
  margin-bottom: 10px;
  width: 58%;
  height: 70px;
  border: none;
  border-bottom: 1px solid;
`;

const FileUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin-top: 20px;
`;

const UploadSection = styled.div`
  display: flex;
  align-items: center;
`;

const PreviewSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const FileInputLabel = styled.label`
  padding: 8px 16px;
  background-color: #3e5879;
  color: #ffffff;
  border-radius: 5px;
  font-size: clamp(12px, 1.2vw, 16px);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FileName = styled.div`
  font-size: 14px;
  color: #3e5879;
`;

const PreviewImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #3e5879;
  color: #ffffff;
  border-radius: 5px;
  font-size: clamp(12px, 1.2vw, 16px);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #576981;
  }
`;
