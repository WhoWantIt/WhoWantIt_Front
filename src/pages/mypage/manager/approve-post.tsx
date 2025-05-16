import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import api from "../../../utils/api";
import * as XLSX from "xlsx";
import { PostType } from "../../../types/PostType";

const PostRequestDetail = () => {

  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [excelData, setExcelData] = useState<string[][] | null>(null);
  //토글 상태 관리
  const [ArrprovalOPtions, setApprovalOptions] = useState(false);

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
  const handleApprovalClick = () => {
    setApprovalOptions(!ArrprovalOPtions);
  };
  if (!post) return <p>게시글을 불러오는 중...</p>;
  const handleVerifyApprove = (postId: number) => {
    api.put(`/post/${postId}/verify-approve`).then((res) => {
      alert(res.data.message);
    });
  };
  return (
    <>
      <Navigation />
      <Container>
        <PostContainer>
          <Title>{post?.title}</Title>
          <Author>기관명 : {post?.nickname}</Author>
          <Viewer initialValue={post?.content || ""} />
          <SectionTitle>후원 물품 사진</SectionTitle>
          <ImageContainer>
            {post?.attachedImages?.map((url, index) => (
              <PreviewImage
                key={index}
                src={url}
                alt={`image-${index}`}
                onClick={() => setSelectedImage(url)}
              />
            ))}
          </ImageContainer>
          {post?.attachedExcelFile && (
            <>
              <SectionTitle>후원 물품 목록</SectionTitle>
              <ExcelContainer>
                {excelData ? (
                  <table>
                    <thead>
                      <tr>
                        {excelData[0]?.map((header: string, index: number) => (
                          <th key={index}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell: string, cellIndex: number) => (
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
        {ApprovalOption && (<ApprovalButton onClick={handleApprovalClick}>검증하기</ApprovalButton>)}
        {ArrprovalOPtions && (
          <ApprovalOption>
            <OptionButton onClick={() => handleVerifyApprove(post?.postId)}>
              검증 승인
            </OptionButton>
          </ApprovalOption>
        )}
      </Container>
      <Footer />

      {selectedImage && (
        <Modal onClick={() => setSelectedImage(null)}>
          <ModalImage src={selectedImage} alt="확대 이미지" />
        </Modal>
      )}
    </>
  );
};

export default PostRequestDetail;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  font-family: Pretendard, sans-serif;
`;

const PostContainer = styled.div`
  width: 60%;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 50px;
  text-align: center;
`;

const Author = styled.p`
  font-size: 18px;
  margin-right: 20px;
  margin-bottom: 40px;
  text-align: right;
`;

const SectionTitle = styled.h2`
  font-size: 25px;
  margin-top: 50px;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
`;
const ApprovalButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: #3e5879;
  border: none;
  border-radius: 10px;
  color: white;
  font-family: "Pretandard", sans-serif;
  font-size: 18px;
  margin-left: 15px;
  margin-bottom: 20px;
  margin-right: 15px;
`;
const ApprovalOption = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
`;

const OptionButton = styled.button`
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ccc;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  height : 45px;
  width: 60px;
  &:hover {
    background-color: #e9ecef;
  }
`;
