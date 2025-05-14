import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import image from "../../assets/just_image.svg";
import api from "../../utils/api";
import { NavLink } from "react-router-dom";
import { PostType } from "../../types/PostType";
import { getUserRole } from "../../utils/jwt";

const ITEMS_PER_PAGE = 12;

const PostsByMonth = () => {
  const navigate = useNavigate();
  const { year: yearParam, month: monthParam } = useParams<{
    year?: string;
    month?: string;
  }>();
  const [year, setYear] = useState(yearParam || "");
  const [month, setMonth] = useState(monthParam || "");
  const [currentPage, setCurrentPage] = useState(0);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(!!yearParam);
  const role = getUserRole();

  useEffect(() => {
    if (yearParam) {
      setYear(yearParam);
      setMonth(monthParam || "");
      fetchPosts(yearParam, monthParam || "", 0);
    }
  }, [yearParam, monthParam]);

  const fetchPosts = (year: string, month: string, page: number) => {
    api
      .get(
        `/posts/monthly?year=${year}&month=${month}&page=${page}&size=${ITEMS_PER_PAGE}`,
      )
      .then((res) => {
        setPosts(res.data.result.content);
        setTotalPages(res.data.result.totalPages);
        setHasSearched(true);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/posts/date/${year}/${month || ""}`);
    fetchPosts(year, month, 0);
    setCurrentPage(0);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchPosts(year, month, pageNumber);
  };

  return (
    <>
      <Navigation />
      <Image src={image} />

      <TabMenu>
        <TabItem to="/posts">#전체</TabItem>
        <TabItem to="/posts/institution/:institution">#기관별 모아보기</TabItem>
        <SelectedTabItem to={`/posts/date/${year}/${month || ""}`}>
          #월별 모아보기
        </SelectedTabItem>
      </TabMenu>

      <SearchArea onSubmit={handleSearch}>
        <YearSelect value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">년도를 선택하세요</option>
          {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>
              {y}년
            </option>
          ))}
        </YearSelect>
        <MonthSelect value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">월을 선택하세요</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {m}월
            </option>
          ))}
        </MonthSelect>
        <SearchButton type="submit">검색</SearchButton>
      </SearchArea>

      {hasSearched && posts.length === 0 ? (
        <NoPostsMessage>검색 결과가 없습니다.</NoPostsMessage>
      ) : (
        posts.length > 0 && (
          <>
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
                <CreatePostButton to="/posts/edit">
                  게시글 작성
                </CreatePostButton>
              )}

              <Pagination isButtonVisible={role === "BENEFICIARY"}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <PageNumber
                      key={pageNumber}
                      active={pageNumber === currentPage + 1}
                      onClick={() => handlePageClick(pageNumber - 1)}
                    >
                      {pageNumber}
                    </PageNumber>
                  ),
                )}
              </Pagination>
            </PaginationContainer>
          </>
        )
      )}

      <Footer />
    </>
  );
};

export default PostsByMonth;

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

const SearchArea = styled.form`
  display: flex;
  justify-content: center;
  height: clamp(30px, 3vw, 45px);
  margin-bottom: 40px;
`;

const YearSelect = styled.select`
  padding: 5px 10px;
  border: 1px solid #3e5879;
  border-radius: 5px;
  margin-right: 10px;
  font-size: clamp(10px, 1.2vw, 16px);
`;

const MonthSelect = styled.select`
  padding: 5px 10px;
  border: 1px solid #3e5879;
  border-radius: 5px;
  margin-right: 10px;
  font-size: clamp(10px, 1.2vw, 16px);
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

const NoPostsMessage = styled.div`
  text-align: center;
  font-size: 24px;
  font-family: Pretendard, sans-serif;
  font-weight: semibold;
  color: #3e5879;
  margin-top: 50px;
  margin-bottom: 50px;
`;
