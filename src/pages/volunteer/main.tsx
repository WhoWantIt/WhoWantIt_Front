import React, { useState } from "react";
import styled from "styled-components";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import image from "../../assets/just_image.svg";
import { useNavigate } from "react-router-dom";
const cityData: string[] = [
  "서울",
  "경기",
  "인천",
  "대전/세종/충남",
  "부산/울산/경상",
  "강원",
  "제주",
];
const fieldData: string[] = [
  "생활편의지원",
  "주거환경",
  "상담",
  "교육",
  "보건의료",
  "문화행사",
  "환경보호",
  "재해 재난",
  "공익 인권",
  "멘토링",
];
/**
 * const SubCityData: string[] = [
  "강남",
  "동대문",
  "상봉",
  "송파파크하비오",
  "코엑스",
  "강동",
  "마곡",
  "상암월드컵경기장",
  "신촌",
  "홍대",
  "군자",
  "목당",
  "성수",
  "이수",
  "화곡",
];
 */

interface Program {
  id: number;
  title: string;
  location: string;
  district: string;
  daysLeft: number;
}

const programData: Program[] = [
  {
    id: 1,
    title: "아이들을 위한 산타 모집",
    location: "자연보호원",
    district: "서울 강남구",
    daysLeft: 32,
  },
  {
    id: 2,
    title: "아이들을 위한 산타 모집",
    location: "자연보호원",
    district: "서울 동작구",
    daysLeft: 2,
  },
  {
    id: 3,
    title: "아이들을 위한 산타 모집",
    location: "자연보호원",
    district: "서울 종로구",
    daysLeft: 15,
  },
  {
    id: 4,
    title: "아이들을 위한 산타 모집",
    location: "자연보호원",
    district: "서울 종로구",
    daysLeft: 15,
  },
  {
    id: 5,
    title: "아이들을 위한 산타 모집",
    location: "자연보호원",
    district: "서울 종로구",
    daysLeft: 15,
  },
  {
    id: 6,
    title: "아이들을 위한 산타 모집",
    location: "자연보호원",
    district: "서울 종로구",
    daysLeft: 15,
  },
  {
    id: 7,
    title: "아이들을 위한 산타 모집",
    location: "자연보호원",
    district: "서울 종로구",
    daysLeft: 15,
  },
  {
    id: 8,
    title: "아이들을 위한 산타 모집",
    location: "자연보호원",
    district: "서울 종로구",
    daysLeft: 15,
  },
  {
    id: 9,
    title: "아이들을 위한 산타 모집",
    location: "자연보호원",
    district: "서울 종로구",
    daysLeft: 15,
  },
];

const HomePage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"city" | "field">("city");
  const [selectedCity, setSelectedCity] = useState<string>("서울");
  const [, setSelectedSubCity] = useState<string | null>(null);
  return (
    <>
      <Container>
        <Navigation />
        <Image src={image} />
        <Wrapper>
          <Sidebar>
            <SectionWrapper>
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
            </SectionWrapper>

            <List>
              {(selectedTab === "city" ? cityData : fieldData).map((item) => (
                <ListItem
                  key={item}
                  active={
                    selectedTab === "city" ? selectedCity === item : false
                  }
                  onClick={() => {
                    if (selectedTab === "city") {
                      setSelectedCity(item);
                      setSelectedSubCity(null);
                    }
                  }}
                >
                  {item}
                </ListItem>
              ))}
            </List>
          </Sidebar>
          <Content>
            <ProgramList programs={programData} />
            <Pagination />
          </Content>
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

/* 프로그램 리스트 */
interface ProgramListProps {
  programs: Program[];
}

const ProgramList: React.FC<ProgramListProps> = ({ programs }) => {
  return (
    <ProgramGrid>
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </ProgramGrid>
  );
};

/* 프로그램 카드 */
interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate("/volunteer/post");
  };
  return (
    <Card onClick={handleDetail}>
      <h4>{program.title}</h4>
      <p>{program.location}</p>
      <Info>
        <span>{program.district}</span>
        <DaysLeft days={program.daysLeft}>
          {program.daysLeft <= 3 ? (
            <strong>D-{program.daysLeft}</strong>
          ) : (
            `D-${program.daysLeft}`
          )}
        </DaysLeft>
      </Info>
    </Card>
  );
};

/* 페이지네이션 */
const Pagination: React.FC = () => {
  return (
    <PaginationContainer>
      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
        <PageNumber key={num}>{num}</PageNumber>
      ))}
    </PaginationContainer>
  );
};

/* 스타일 정의 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Pretendard, sans-serif;
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%
  height: auto;
  flex-wrap: wrap;
  padding: 20px;
`;
const Sidebar = styled.div`
  width: 250px;
  padding: 20px;
`;
const SectionWrapper = styled.div`
  display: flex;
  justify-content: center;
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

const List = styled.div`
  width: 332px;
  height: 660px;
  list-style: none;
  padding: 10px;
  background: #ededee;
  border-radius: 10px;
  margin-top: 50px;
`;

interface ListItemProps {
  active: boolean;
}

const ListItem = styled.li<ListItemProps>`
  margin-top: 15px;
  padding: 10px;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  color: ${({ active }) => (active ? "#000" : "#777")};
  &:hover {
    color: #000;
  }
`;

const Content = styled.div`
  margin-left: 150px;
  flex: 1;
  padding: 20px;
  margin-top: 90px;
  @media (max-width: 1024px) {
    margin-left: 50px;
  }
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 50px;
    padding: 10px;
  }
`;

const ProgramGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  padding: 0px 60px;
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

const Card = styled.div`
  width: 300px;
  height: 180px;
  background: #c0c7d6;
  padding: 15px;
  border-radius: 10px;
  h4 {
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  p {
    font-size: 18px;
    color: black;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  font-size: 18px;
  color: black;
`;

interface DaysLeftProps {
  days: number;
}

const DaysLeft = styled.span<DaysLeftProps>`
  font-weight: bold;
  color: ${({ days }) => (days <= 3 ? "red" : "black")};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 70px;
  margin-bottom: 30px;
`;

const PageNumber = styled.span`
  margin: 5px 5px;
  cursor: pointer;
  color: #555;
  &:hover {
    color: #000;
  }
`;
const Image = styled.img`
  width: 100%;
  height: auto;
`;

export default HomePage;
