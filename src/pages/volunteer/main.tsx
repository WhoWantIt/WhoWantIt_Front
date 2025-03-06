//const api = import.meta.env.VITE_API_URL;
/*
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import image from "../../assets/just_image.svg";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 10;
const tags = [
  { name: "LIVING_SUPPORT", text: "생활편의지원" },
  { name: "HOUSING_ENVIRONMENT", text: "주거환경" },
  { name: "COUNSELING", text: "상담" },
  { name: "EDUCTION", text: "교육" },
  { name: "HEALTHCARE", text: "보건의료" },
  { name: "CULTURAL_EVENTS", text: "문화행사" },
  { name: "ENVIRONMENTAL_PROTECTION", text: "환경보호" },
  { name: "DISASTER_RELIEF", text: "재해·재난" },
  { name: "PUBLIC_INTEREST_RIGHTS", text: "공익인권" },
  { name: "MENTORING", text: "멘토링" },
  { name: "OTHERS", text: "기타" },
];
// 데이터 가져올 파일 따로 만들어놓기
const cities = [
  "서울",
  "경기",
  "인천",
  "댜천/충청/세종",
  "부산/대구/경상",
  "강원",
  "제주",
];

const SeoulDistrict = [
  "도봉구",
  "노원구",
  "강북구",
  "성북구",
  "중랑구",
  "동대무구",
  "종로구",
  "은평구",
  "서대문구",
  "중구",
  "성동구",
  "광진구",
  "용산구",
  "마포구",
  "강서구",
  "양천구",
  "구로구",
  "영등포구",
  "동작구",
  "금천구",
  "동작구",
  "관악구",
  "서초구",
  "강남구",
  "송파구",
  "강동구",
];

interface CardType {
  volunteerId: number;
  beneficiaryId: number;
  nickname: string;
  title: string;
  field: string;
  content: string;
  attachedImage: string[];
  startTime: string;
  deadline: string;
  maxCapacity: number;
  currentCapacity: number;
  approvalStatus: string;
  createdAt: string;
  updateAt: string;
}
const api = import.meta.env.VITE_API_URL;

const VolunteerPage = () => {
  const [selectedTab, setSelectedTab] = useState<"city" | "field">("city");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  //const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<CardType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = cards.slice(startIndex, endIndex);
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  //전체 조회 - useEffect로 전달 ?
  useEffect(() => {
    const handleAll = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const client = await fetch(`${api}volunteers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = client.json();
        console.log("봉사 리스트 조회 res: ", data);
      } catch (error) {
        console.log("REQUEST FAILED:", error);
        alert("서버와의 연결에 문제가 생겼습니다.");
      }
    };
    handleAll();
  }, []);
  // 지역별 봉사 리스트 조회 - useEffect?
  const handleRegions = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const client = await fetch(
        `${api}volunteers/regions?city=${city}&district=${subCity}&page=0&size=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = client.json();
      console.log("지역별 봉사 리스트 조회 res:", data);
    } catch (error) {
      console.log("REQUEST FAILED:", error);
      alert("서버와의 연결에 문제가 생겼습니다.");
    }
  };
  // 분야별 봉사 리스트 조회 - useEffect?
  const handleFields = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const client = await fetch(`${api}volunteers/fields?field=${field}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = client.json();
      console.log("분야별 봉사 리스트 조회 res:", data);
    } catch (error) {
      console.error("REQUEST FAILED:", error);
      alert("서버와의 연결에 문제가 생겼습니다.");
    }
  };
  return (
    <>
      <Container>
        <Navigation />
        <Image src={image} />
        <Wrapper>
          <ButtonWrapper>
            <Button
              active={selectedTab === "city"}
              onClick={() => setSelectedTab("city")}
            >
              #도시 설정
            </Button>
            <Button
              active={selectedTab === "field"}
              onClick={() => setSelectedTab("field")}
            >
              #분야 설정
            </Button>
          </ButtonWrapper>
          <SidebarWrapper>
            {selectedTab === "city" ? (
              <>
                {/* 도시 리스트 **
                <CityList>
                  {cities.map((city) => (
                    <CityItem
                      key={city}
                      active={selectedCity === city}
                      onClick={() => setSelectedCity(city)}
                    >
                      {city}
                    </CityItem>
                  ))}
                </CityList>

                {/* 서울 선택 시만 구 리스트 표시 **
                {selectedCity === "서울" && (
                  <DistrictList>
                    {SeoulDistrict.map((district) => (
                      <DistrictItem key={district}>{district}</DistrictItem>
                    ))}
                  </DistrictList>
                )}
              </>
            ) : (
              /* 분야 리스트 **
              <FieldList>
                {tags.map((tag) => (
                  <FieldItem key={tag.name}>{tag.text}</FieldItem>
                ))}
              </FieldList>
            )}
          </SidebarWrapper>
          <CardGrid>
            {currentCard.map(card, index) => (
              <Card key={index} >
                <CardTitle>{card.title}</CardTitle>
                <CardName>{card.nickname}</CardName>
                <CardLocation>{card.city} {card.district}</CardLocation>
                <CardDate>D-{card.deadline}</CardDate>
              </Card>
            )}}
          </CardGrid>
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
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

export default VolunteerPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Pretendard, sans-serif;
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Pretandard, sans-serif;
  width: 100%;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-conten: center;
  align-items: center;
`;
interface ButtonProps {
  active: boolean;
}
const Button = styled.button<ButtonProps>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ active }) => (active ? "#3E5879" : "#E6D9D2")};
  padding: 8px 16px;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? "#3E5879" : "#E6D9D2")};
  background: transparent;
  cursor: pointer;
  position: relative;
`;
const SidebarWrapper = styled.div``;
const CityList = styled.div``;
const CityItem = styled.div``;

const DistrictList = styled.div``;
const DistrictItem = styled.div``;

const FieldList = styled.div``;
const FieldItem = styled.div``;

const CardGrid = styled.div``;
const Card = styled.div``;
const CardTitle = styled.div``;
const CardName = styled.div``;
const CardDate = styled.div``;
const CardLocation = styled.div``;
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
*/
