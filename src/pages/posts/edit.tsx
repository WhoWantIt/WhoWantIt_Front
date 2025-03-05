import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

const PostEdit = () => {
  const [title, setTitle] = useState<string>("");

  return (
    <>
      <Navigation />
      <Container>
        <EditorContainer>
          <TitleInput
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Editor
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "image", "link"],
              ["code", "codeblock"],
            ]}
            height="500px"
            initialEditType="wysiwyg"
            previewStyle="vertical"
            initialValue="내용을 입력해주세요."
          ></Editor>
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
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid;
`;
