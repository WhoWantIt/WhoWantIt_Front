import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import * as XLSX from "xlsx";
import { PostType } from "../../types/PostType";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostType | null>(null);
  const [excelData, setExcelData] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${postId}`);
        setPost(response.data.result as PostType);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    };
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (post?.attachedExcelFile) {
      fetchExcelData(post.attachedExcelFile);
    }
  }, [post]);

  const fetchExcelData = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      setExcelData(XLSX.utils.sheet_to_json(sheet, { header: 1 }));
    } catch (error) {
      console.error("엑셀 파일 불러오기 실패:", error);
    }
  };

  if (!post) return <p>게시글을 불러오는 중...</p>;

  return (
    <>
      <Navigation />
      <Container>
        <PostContainer>
          <Title>{post?.title}</Title>
          <Author>작성자: {post?.nickname}</Author>
          <Viewer initialValue={post?.content || ""} />
          <SectionTitle>첨부 이미지</SectionTitle>
          <ImageContainer>
            {post?.attachedImages?.map((url, index) => (
              <PreviewImage key={index} src={url} alt={`image-${index}`} />
            ))}
          </ImageContainer>
          {post?.attachedExcelFile && (
            <>
              <SectionTitle>첨부 엑셀 파일</SectionTitle>
              <ExcelContainer>
                {excelData ? (
                  <table>
                    <thead>
                      <tr>
                        {excelData[0]?.map((header, index) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>엑셀 파일을 불러오는 중...</p>
                )}
              </ExcelContainer>
            </>
          )}
        </PostContainer>
      </Container>
      <Footer />
    </>
  );
};

export default PostDetail;

/* 스타일 정의 */
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  font-family: Pretendard, sans-serif;
`;

const PostContainer = styled.div`
  width: 70%;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 30px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const ExcelContainer = styled.div`
  overflow-x: auto;
  margin-top: 10px;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  th {
    background-color: #f4f4f4;
  }
`;
