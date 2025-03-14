//const api = import.meta.env.VITE_API_URL;
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import image from "../../assets/just_image.svg";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  "대전/충청/세종",
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
  const navigate = useNavigate();
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
  //총페이지
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    api
      .get("/volunteers")
      .then((res) => {
        const processedData = res.data.result.content.map((card: CardType) => {
          const porcessedAaddress =
            card.address.match(/^서울시\s\S+/)?.[0] || card.address;
          const deadlineDate = new Date(card.deadline);
          const today = new Date();
          const time = deadlineDate.getTime() - today.getTime();
          const dDay = Math.ceil(time / (1000 * 60 * 60 * 24));
          return {
            ...card,
            address: porcessedAaddress,
            deadline: dDay >= 0 ? `D-${dDay}` : `D+${-dDay}(마감)`,
          };
        });
        setCards(processedData);
      })
      .catch((err) => console.error("Error fetching cards:", err));
  }, []);

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  //city, subcity, field 변경될때만 useEffect
  useEffect(() => {
    if (city && subCity) {
      api
        .get(
          `/volunteers/regions?city=${city}&district=${subCity}&page=0&size=9`,
        )
        .then((res) => {
          const processedData = res.data.result.content.map(
            (card: CardType) => {
              const porcessedAaddress =
                card.address.match(/^서울시\s\S+/)?.[0] || card.address;
              const deadlineDate = new Date(card.deadline);
              const today = new Date();
              const time = deadlineDate.getTime() - today.getTime();
              const dDay = Math.ceil(time / (1000 * 60 * 60 * 24));
              return {
                ...card,
                address: porcessedAaddress,
                deadline: dDay >= 0 ? `D-${dDay}` : `D+${-dDay}(마감)`,
              };
            },
          );
          setCards(processedData);
        })
        .catch((err) => console.error("Error fetching cards:", err));
    }
  }, [city, subCity]); // 의존성 배열 추가

  useEffect(() => {
    if (field) {
      api
        .get(`${api}volunteers/fields?field=${field}`)
        .then((res) => {
          const processedData = res.data.result.content.map(
            (card: CardType) => {
              const porcessedAaddress =
                card.address.match(/^서울시\s\S+/)?.[0] || card.address;
              const deadlineDate = new Date(card.deadline);
              const today = new Date();
              const time = deadlineDate.getTime() - today.getTime();
              const dDay = Math.ceil(time / (1000 * 60 * 60 * 24));
              return {
                ...card,
                address: porcessedAaddress,
                deadline: dDay >= 0 ? `D-${dDay}` : `D+${-dDay}(마감)`,
              };
            },
          );
          setCards(processedData);
        })
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
  const handleDetailCard = (volunteerId: number) => {
    navigate(`/volunteer/post/${volunteerId}`);
  };
  // 해당 post의 volunteerId를 통해 해당 Id의 상세 내용을 post.tsx에서 볼 수 있게 해줘
  //const handleParticalPost =
  return (
    <>
      <Container>
        <Navigation />
        <Image src={image} />
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
        <Wrapper>
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
              <Card
                key={index}
                onClick={() => handleDetailCard(card.volunteerId)}
              >
                <DetailInCard>
                  <CardTitle>{card.title}</CardTitle>
                  <CardName>{card.nickname}</CardName>
                  <DetailWrapper>
                    <CardLocation>{card.address}</CardLocation>
                    <CardDate>{card.deadline}</CardDate>
                  </DetailWrapper>
                </DetailInCard>
              </Card>
            ))}
          </CardGrid>
        </Wrapper>
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
  justify-content: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-top: 40px;
  margin-left: 160px;
  gap: 20px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 300px;
  max-width: 300px;
  margin-left: 310px;
  margin-top: 90px;
`;
interface ButtonProps {
  active: boolean;
}
const Button = styled.button<ButtonProps>`
  font-size: 20px;
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
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  width: 300px;
  height: 600px;
  margin-top: -60px;
  margin-left: 100px;
`;

const CityList = styled.div`
  dflex: 1;
  border-right: 1px solid #ccc;
  padding-right: 10px;
  overflow-y: auto;
`;

const CityItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  font-size: 16px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  padding: 6px 10px;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ active }) => (active ? "#3E5879" : "black")};
`;

const DistrictList = styled.div`
  flex: 1;
  min-width: 150px;
  padding-left: 10px;
  overflow: hidden;
`;

const DistrictItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  font-size: 15px;
  padding: 6px 10px;
  cursor: pointer;
  white-space: nowrap;
  color: ${({ active }) => (active ? "#3E5879" : "black")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
`;
const FieldList = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  min-width: 100px;
  padding-right: 10px;
`;

const FieldItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>`
  font-size: 20px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  padding: 6px 10px;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ active }) => (active ? "#3E5879" : "#333")};
`;
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;
  margin-top: -60px;
  width: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 0 100px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 50px;
  }
`;

const Card = styled.div`
  width: 280px;
  height: 180px;
  padding: 15px;
  border-radius: 10px;
`;
const DetailInCard = styled.div`
  width: 100%;
  height: 170px;
  padding: 10px;
  background-color: #c0c7d6;
  border-radius: 8px;
`;

const CardTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const CardName = styled.div`
  display: flex;
  margin-top: 15px;
  margin-left: 10px;
  font-size: 18px;
  color: black;
`;
const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;
const CardLocation = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 18px;
  color: black;
`;

const CardDate = styled.div`
  display: flex;
  margin-top: 10px;
  margin-right: 20px;
  font-size: 18px;
  color: black;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 0px;
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
