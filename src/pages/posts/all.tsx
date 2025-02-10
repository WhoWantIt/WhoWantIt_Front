import styled from "styled-components";
import posts from "../../data/posts";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import image from "../../assets/just_image.svg";

const ITEMS_PER_PAGE = 12;

const AllPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  return (
    <>
      <Navigation />
      <Image src={image} />

      <TabMenu>
        <SelectedTabItem as={Link} to="/posts" activeClassName="active">
          #전체
        </SelectedTabItem>
        <TabItem as={Link} to="/posts/:institution" activeClassName="active">
          #기관별 모아보기
        </TabItem>
        <TabItem as={Link} to="/posts/:year/:month" activeClassName="active">
          #월별 모아보기
        </TabItem>
      </TabMenu>

      <PostGrid>
        {currentPosts.map((post, index) => (
          <PostCard key={index} isVerified={post.isVerified}>
            <PostTitle>{post.title}</PostTitle>
            <PostInstitution>{post.institution}</PostInstitution>
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
    </>
  );
};

export default AllPosts;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 70px;
`;

const TabItem = styled(Link)`
  width: 300px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  padding-bottom: 10px;
  color: #e6d9d2;
  font-size: 30px;
  font-family: Pretendard, sans-serif;
  border-bottom: 1px solid #e6d9d2;
`;

const SelectedTabItem = styled(Link)`
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
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 0px 150px;
  box-sizing: border-box;
`;

const PostCard = styled.div<{ isVerified: boolean }>`
  width: 200px;
  height: 120px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${(props) => (props.isVerified ? "#3e5879" : "#c0c7d6")};
  color: ${(props) => (props.isVerified ? "#ffffff" : "#000000")};
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const PostInstitution = styled.div`
  font-size: 16px;
  margin-top: 5px;
`;

const PostStatus = styled.div`
  font-size: 16px;
  text-align: right;
  margin-top: auto;
  align-self: flex-end;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 70px;
  margin-bottom: 30px;
  margin-right: 170px;
`;

const PageNumber = styled.div<{ active?: boolean }>`
  padding: 5px 5px;
  border: none;
  margin: 0 5px;
  cursor: pointer;
  font-family: Pretendard, sans-serif;
  font-size: 20px;
  color: ${(props) => (props.active ? "#3e5879" : "#e6d9d2")};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;
