import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import image from "../../assets/just_image.svg";
import posts from "../../data/posts";

const ITEMS_PER_PAGE = 12;

const PostsByMonth = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { year, month } = useParams<{ year?: string; month?: string }>();

  useEffect(() => {
    if (year && month) {
      setSelectedYear(parseInt(year, 10));
      setSelectedMonth(parseInt(month, 10));
    } else {
      setSelectedYear(null);
      setSelectedMonth(null);
    }
    setCurrentPage(1);
  }, [year, month]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const yearValue = parseInt(e.target.value, 10);
    setSelectedYear(yearValue === -1 ? null : yearValue); // -1은 "전체" 옵션
    if (selectedMonth) {
      navigate(`/posts/${yearValue === -1 ? "" : yearValue}/${selectedMonth}`);
    } else {
      navigate(`/posts/${yearValue === -1 ? "" : yearValue}`);
    }

    setCurrentPage(1);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monthValue = parseInt(e.target.value, 10);
    setSelectedMonth(monthValue === -1 ? null : monthValue); // -1은 "전체" 옵션

    if (selectedYear) {
      navigate(`/posts/${selectedYear}/${monthValue === -1 ? "" : monthValue}`);
    } else {
      navigate(`/posts/${monthValue === -1 ? "" : ""}`);
    }
    setCurrentPage(1);
  };

  // Generate list of years and months
  const startYear = 2020;
  const endYear = 2025;
  const availableYears = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  const availableMonths = Array.from({ length: 12 }, (_, i) => i + 1);

  const filteredPosts = posts.filter((post) => {
    const postDate = new Date(post.date);
    const postYear = postDate.getFullYear();
    const postMonth = postDate.getMonth() + 1;

    const yearMatch = selectedYear === null || postYear === selectedYear;
    const monthMatch = selectedMonth === null || postMonth === selectedMonth;

    return yearMatch && monthMatch;
  });

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
        <TabItem as={Link} to="/posts" activeClassName="active">
          #전체
        </TabItem>
        <TabItem as={Link} to="/posts/:institution" activeClassName="active">
          #기관별 모아보기
        </TabItem>
        <SelectedTabItem
          as={Link}
          to={`/posts/${year || ""}/${month || ""}`}
          activeClassName="active"
        >
          #월별 모아보기
        </SelectedTabItem>
      </TabMenu>

      <FilterArea>
        <Select value={selectedYear === null ? -1 : selectedYear} onChange={handleYearChange}>
          <option value={-1}>전체 년도</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select value={selectedMonth === null ? -1 : selectedMonth} onChange={handleMonthChange}>
          <option value={-1}>전체 월</option>
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {month}월
            </option>
          ))}
        </Select>
      </FilterArea>

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

      {filteredPosts.length > 0 && (
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

const FilterArea = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #3e5879;
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px;
  width: 200px;
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