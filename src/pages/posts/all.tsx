import styled from "styled-components";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import image from "../../assets/just_image.svg";
import api from "../../utils/api";

const ITEMS_PER_PAGE = 12;

interface PostType {
  postId: number;
  beneficiaryId: number;
  nickname: string;
  title: string;
  content: string;
  attachedImages: string[];
  attachedExcelFile: string;
  approvalStatus: string;
  isVerified: boolean;
  createdAt: string;
}

const AllPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setPosts(res.data.result.content))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  return (
    <Wrapper>
      <Navigation />
      <Image src={image} />

      <TabMenu>
        <TabItem to="/posts">#전체</TabItem>
        <TabItem to="/posts/:institution">#기관별 모아보기</TabItem>
        <TabItem to="/posts/:year/:month">#월별 모아보기</TabItem>
      </TabMenu>

      <PostGrid>
        {currentPosts.map((post, index) => (
          <PostCard key={index} isVerified={post.isVerified}>
            <PostTitle>{post.title}</PostTitle>
            <PostInstitution>{post.nickname}</PostInstitution>
            <PostStatus>
              {post.isVerified ? "Verified" : "Not Verified"}
            </PostStatus>
          </PostCard>
        ))}
      </PostGrid>

      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <PageNumber
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </PageNumber>
          ),
        )}
      </Pagination>

      <Footer />
    </Wrapper>
  );
};

export default AllPosts;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Pretendard, sans-serif;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 70px;
`;

const TabItem = styled(NavLink)`
  width: 300px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  padding-bottom: 10px;
  color: #e6d9d2;
  font-size: clamp(16px, 2vw, 30px);
  border-bottom: 1px solid #e6d9d2;

  &.active {
    color: #3e5879;
    font-weight: bold;
    border-bottom: 3px solid #3e5879;
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 0px 150px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 100px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 50px;
  }
`;

const PostCard = styled.div<{ isVerified: boolean }>`
  width: clamp(140px, 18vw, 200px);
  height: clamp(80px, 12vw, 120px);
  padding: clamp(10px, 2vw, 20px);
  border-radius: 10px;
  background-color: ${(props) => (props.isVerified ? "#3e5879" : "#c0c7d6")};
  color: ${(props) => (props.isVerified ? "#ffffff" : "#000000")};
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostTitle = styled.div`
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: bold;
`;

const PostInstitution = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
  margin-top: 5px;
`;

const PostStatus = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
  text-align: right;
  margin-top: auto;
  align-self: flex-end;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 70px;
  margin-bottom: 30px;
  margin-right: clamp(50px, 10vw, 170px);
`;

const PageNumber = styled.div<{ active?: boolean }>`
  padding: 5px 5px;
  margin: 0 5px;
  cursor: pointer;
  font-size: clamp(12px, 1.2vw, 20px);
  color: ${(props) => (props.active ? "#3e5879" : "#e6d9d2")};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;
