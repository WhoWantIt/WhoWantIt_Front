import styled from "styled-components";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import image from "../../assets/just_image.svg";
import api from "../../utils/api";
import { PostType } from "../../types/PostType";
import { getUserRole } from "../../utils/jwt";

const ITEMS_PER_PAGE = 12;

const AllPosts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const role = getUserRole();

  useEffect(() => {
    api
      .get(`/posts?page=${currentPage}&size=${ITEMS_PER_PAGE}`)
      .then((res) => {
        setPosts(res.data.result.content);
        setTotalPages(res.data.result.totalPages);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [currentPage]);

  return (
    <Wrapper>
      <Navigation />
      <Image src={image} />

      <TabMenu>
        <SelectedTabItem to="/posts">#전체</SelectedTabItem>
        <TabItem to={"/posts/institution/:institution"}>
          #기관별 모아보기
        </TabItem>
        <TabItem to="/posts/date/:year/:month">#월별 모아보기</TabItem>
      </TabMenu>

      <PostGrid>
        {posts.map((post) => (
          <PostCard
            key={post.postId}
            to={`/posts/${post.postId}`}
            isVerified={post.isVerified}
          >
            <PostTitle>{post.title}</PostTitle>
            <PostInstitution>{post.nickname}</PostInstitution>
            <PostStatus>
              {post.isVerified ? "Verified" : "Not Verified"}
            </PostStatus>
          </PostCard>
        ))}
      </PostGrid>

      <PaginationContainer>
        {role === "BENEFICIARY" && (
          <CreatePostButton to="/posts/edit">게시글 작성</CreatePostButton>
        )}

        <Pagination isButtonVisible={role === "BENEFICIARY"}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <PageNumber
                key={pageNumber}
                active={pageNumber === currentPage + 1}
                onClick={() => setCurrentPage(pageNumber - 1)}
              >
                {pageNumber}
              </PageNumber>
            ),
          )}
        </Pagination>
      </PaginationContainer>

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
  font-size: 30px;
  border-bottom: 1px solid #e6d9d2;

  @media (max-width: 1500px) {
    font-size: 26px;
  }

  @media (max-width: 1200px) {
    font-size: 22px;
  }

  @media (max-width: 800px) {
    font-size: 18px;
  }
`;

const SelectedTabItem = styled(NavLink)`
  width: 300px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  padding-bottom: 10px;
  color: #3e5879;
  font-size: 30px;
  font-family: Pretendard, sans-serif;
  font-weight: bold;
  border-bottom: 3px solid #3e5879;

  @media (max-width: 1500px) {
    font-size: 26px;
  }

  @media (max-width: 1200px) {
    font-size: 22px;
  }

  @media (max-width: 800px) {
    font-size: 18px;
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  padding: 0px 300px;
  box-sizing: border-box;

  @media (max-width: 1500px) {
    grid-gap: 20px;
    padding: 0px 150px;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0px 80px;
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0px 140px;
  }

  @media (max-width: 530px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0px 90px;
  }
`;

const PostCard = styled(NavLink)<{ isVerified: boolean }>`
  width: 250px;
  height: 150px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.isVerified ? "#3e5879" : "#c0c7d6")};
  color: ${(props) => (props.isVerified ? "#ffffff" : "#000000")};
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isVerified ? "#2d3e56" : "#a6b0c3")};
  }

  @media (max-width: 1500px) {
    width: 200px;
    height: 120px;
    padding: 20px;
  }

  @media (max-width: 1200px) {
    width: 150px;
    height: 90px;
    padding: 16px;
  }

  @media (max-width: 800px) {
    width: 145px;
    height: 87px;
    padding: 13px;
  }
`;

const PostTitle = styled.div`
  font-size: 22px;
  font-weight: bold;

  @media (max-width: 1500px) {
    font-size: 20px;
  }

  @media (max-width: 1200px) {
    font-size: 15px;
  }

  @media (max-width: 800px) {
    font-size: 13px;
  }
`;

const PostInstitution = styled.div`
  font-size: 18px;
  margin-top: 5px;

  @media (max-width: 1500px) {
    font-size: 16px;
  }

  @media (max-width: 1200px) {
    font-size: 12px;
  }

  @media (max-width: 800px) {
    font-size: 11px;
  }
`;

const PostStatus = styled.div`
  font-size: clamp(12px, 1.2vw, 16px);
  text-align: right;
  margin-top: auto;
  align-self: flex-end;

  @media (max-width: 1500px) {
    font-size: 16px;
  }

  @media (max-width: 1200px) {
    font-size: 12px;
  }

  @media (max-width: 800px) {
    font-size: 11px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 70px clamp(50px, 10vw, 170px) 30px clamp(50px, 10vw, 170px);
`;

const CreatePostButton = styled(NavLink)`
  padding: 8px 16px;
  background-color: #3e5879;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  font-size: clamp(12px, 1.2vw, 16px);
`;

const Pagination = styled.div<{ isButtonVisible?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isButtonVisible ? "right" : "flex-end")};
  flex-grow: 1;
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
