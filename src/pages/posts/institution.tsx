import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import image from "../../assets/just_image.svg";
import { NavLink } from "react-router-dom";
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

const PostsByInstitution = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const { institution } = useParams<{ institution?: string }>();

  useEffect(() => {
    if (institution && institution !== ":institution") {
      setSearchTerm(institution);
      handleSearchRequest(institution, 0);
    } else {
      setSearchTerm("");
      setFilteredPosts([]);
      setHasSearched(false);
    }
    setCurrentPage(1);
  }, [institution]);

  const handleSearchRequest = (term: string, page: number) => {
    api
      .get(
        `/posts/beneficiaries?nickname=${term}&page=${page}&size=${ITEMS_PER_PAGE}`,
      )
      .then((res) => {
        setFilteredPosts(res.data.result.content);
        setHasSearched(true);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/posts/${searchTerm || ":institution"}`);
    handleSearchRequest(searchTerm, 0);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    handleSearchRequest(searchTerm, pageNumber - 1);
  };

  return (
    <>
      <Navigation />
      <Image src={image} />

      <TabMenu>
        <TabItem to="/posts">#전체</TabItem>
        <SelectedTabItem to={`/posts/${searchTerm || ":institution"}`}>
          #기관별 모아보기
        </SelectedTabItem>
        <TabItem to="/posts/:year/:month">#월별 모아보기</TabItem>
      </TabMenu>

      <SearchArea onSubmit={handleSearch}>
        <SearchInput
          placeholder="기관명을 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
        />
        <SearchButton type="submit">검색</SearchButton>
      </SearchArea>

      {hasSearched && filteredPosts.length === 0 ? (
        <NoPostsMessage>검색 결과가 없습니다.</NoPostsMessage>
      ) : (
        hasSearched &&
        filteredPosts.length > 0 && (
          <>
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
          </>
        )
      )}

      <Footer />
    </>
  );
};

export default PostsByInstitution;

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
`;

const SelectedTabItem = styled(NavLink)`
  width: 300px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  padding-bottom: 10px;
  color: #3e5879;
  font-size: clamp(16px, 2vw, 30px);
  font-family: Pretendard, sans-serif;
  font-weight: bold;
  border-bottom: 3px solid #3e5879;
`;

const SearchArea = styled.form`
  display: flex;
  justify-content: center;
  height: clamp(30px, 3vw, 45px);
  margin-bottom: 40px;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #3e5879;
  border-radius: 5px;
  margin-right: 10px;
  width: clamp(250px, 30vw, 400px);
  font-size: clamp(12px, 1.2vw, 16px);
`;

const SearchButton = styled.button`
  background-color: #3e5879;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: clamp(12px, 1.2vw, 16px);
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

const NoPostsMessage = styled.div`
  text-align: center;
  font-size: 24px;
  font-family: Pretendard, sans-serif;
  font-weight: semibold;
  color: #3e5879;
  margin-top: 50px;
  margin-bottom: 50px;
`;
