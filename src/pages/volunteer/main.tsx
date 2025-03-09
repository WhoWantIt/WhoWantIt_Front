//const api = import.meta.env.VITE_API_URL;
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import image from "../../assets/just_image.svg";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../utils/api";
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
  address: string;
}

const VolunteerPage = () => {
  const [selectedTab, setSelectedTab] = useState<"city" | "field">("city");
  //const [selectedCity, setSelectedCity] = useState<string | null>(null);
  //const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<CardType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // value change
  const [city, setCity] = useState<string>("");
  const [subCity, setSubCity] = useState<string>("");
  const [field, setField] = useState<string>("");

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCards = cards.slice(startIndex, endIndex);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    api
      .get("/volunteers")
      .then((res) => setCards(res.data.result.content))
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  //city, subcity, field 변경될때만 useEffect
  useEffect(() => {
    if (city && subCity) {
      api
        .get(
          `/volunteers/regions?city=${city}&district=${subCity}&page=0&size=10`,
        )
        .then((res) => setCards(res.data.result.content))
        .catch((err) => console.error("Error fetching cards:", err));
    }
  }, [city, subCity]); // 의존성 배열 추가

  useEffect(() => {
    if (field) {
      api
        .get(`${api}volunteers/fields?field=${field}`)
        .then((res) => setCards(res.data.result.content))
        .catch((err) => console.error("Error fetching cards:", err));
    }
  }, [field]); // 의존성 배열 추가
  const handleCityClick = (selected: string) => {
    setCity(selected);
    setSubCity(""); // 도시 변경 시 구 초기화
  };

  const handleSubCityClick = (selected: string) => {
    setSubCity(selected);
  };

  const handleFieldClick = (selected: string) => {
    setField(selected);
  };
  // 해당 post의 volunteerId를 통해 해당 Id의 상세 내용을 post.tsx에서 볼 수 있게 해줘
  //const handleParticalPost =
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
                {/* 도시 리스트 */}
                <CityList>
                  {cities.map((cityItem) => (
                    <CityItem
                      key={cityItem}
                      active={city === cityItem}
                      onClick={() => handleCityClick(cityItem)}
                    >
                      {cityItem}
                    </CityItem>
                  ))}
                </CityList>

                {/* 서울 선택 시만 구 리스트 표시 */}
                {city === "서울" && (
                  <DistrictList>
                    {SeoulDistrict.map((district) => (
                      <DistrictItem
                        key={district}
                        active={subCity === district}
                        onClick={() => handleSubCityClick(district)}
                      >
                        {district}
                      </DistrictItem>
                    ))}
                  </DistrictList>
                )}
              </>
            ) : (
              /* 분야 리스트 **/
              <FieldList>
                {tags.map((tag) => (
                  <FieldItem
                    key={tag.name}
                    active={field === tag.name}
                    onClick={() => handleFieldClick(tag.name)}
                  >
                    {tag.text}
                  </FieldItem>
                ))}
              </FieldList>
            )}
          </SidebarWrapper>
          {/**오늘 날짜 - deadline 형태만 삭제 */}
          <CardGrid>
            {currentCards.map((card, index) => (
              <Card key={index}>
                <CardTitle>{card.title}</CardTitle>
                <CardName>{card.nickname}</CardName>
                <CardLocation>{card.address}</CardLocation>
                <CardDate>D-{card.deadline}</CardDate>
              </Card>
            ))}
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
  justify-content: center;
  align-items: center;
  gap: 10px;
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
const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px; /* 사이드바 크기 제한 */
  margin: 0 auto;
`;

const CityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const CityItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #e6d9d2;
  color: #3e5879;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #3e5879;
    color: white;
  }
`;

const FieldList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const FieldItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #e6d9d2;
  color: #3e5879;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #3e5879;
    color: white;
  }
`;

const DistrictList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  max-width: 500px; /* 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
`;

const DistrictItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  padding: 10px 15px;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? "#3e5879" : "#e6d9d2")};
  color: ${({ active }) => (active ? "white" : "#3e5879")};
  cursor: pointer;
  transition: background 0.3s;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background-color: #3e5879;
    color: white;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
`;

const Card = styled.div`
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #3e5879;
  margin-bottom: 5px;
`;

const CardName = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
`;

const CardLocation = styled.div`
  font-size: 14px;
  color: #3e5879;
  margin-bottom: 5px;
`;

const CardDate = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #ff6b6b;
  margin-top: auto;
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
