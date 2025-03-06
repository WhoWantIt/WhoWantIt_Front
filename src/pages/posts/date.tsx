import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import image from "../../assets/just_image.svg";
import api from "../../utils/api";
import { NavLink } from "react-router-dom";

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

const PostsByMonth = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const { yearParam, monthParam } = useParams<{
    yearParam?: string;
    monthParam?: string;
  }>();

  useEffect(() => {
    if (yearParam) {
      setYear(yearParam);
      setMonth(monthParam || "");
      handleSearchRequest(yearParam, monthParam || "");
    } else {
      setYear("");
      setMonth("");
      setFilteredPosts([]);
      setHasSearched(false);
    }
    setCurrentPage(1);
  }, [yearParam, monthParam]);

  const handleSearchRequest = (year: string, month: string) => {
    api
      .get(`/posts/monthly?year=${year}&month=${month}&size=${ITEMS_PER_PAGE}`)
      .then((res) => {
        setFilteredPosts(res.data.result.content);
        setHasSearched(true);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/posts/${year}/${month || undefined}`);
    handleSearchRequest(year, month);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navigation />
      <Image src={image} />

      <TabMenu>
        <TabItem to="/posts">#전체</TabItem>
        <TabItem to="/posts/:institution">#기관별 모아보기</TabItem>
        <SelectedTabItem to={`/posts/${year}/${month || undefined}`}>
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

      {hasSearched && filteredPosts.length === 0 ? (
        <NoPostsMessage>검색 결과가 없습니다.</NoPostsMessage>
      ) : (
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

const YearSelect = styled.select`
  padding: 10px;
  border: 1px solid #3e5879;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
`;

const MonthSelect = styled.select`
  padding: 10px;
  border: 1px solid #3e5879;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
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
