//fund
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "react-datepicker/dist/react-datepicker.css";
import Navigation from "../../../components/Navigation";
import { useState } from "react";
import BookMarkColorSVG from "../../../assets/volunteer/bookmark_color.svg";

// 메인 컴포넌트
const ScrapPage = () => {
  const [selectedTab, setSelectTab] = useState<"funding" | "volunteer">(
    "funding",
  );
  const [documents] = useState<string[]>([
    "스크랩",
    "참여한 펀딩",
    "참여한 봉사",
    "개인정보 수정",
  ]);
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      <Container>
        {/* 왼쪽 사이드바 */}
        <Sidebar>
          <Wrapper>마이페이지</Wrapper>
          <DocumentList>
            {documents.map((doc, index) => (
              <DocumentItem
                key={index}
                active={activeDoc === doc}
                onClick={() => setActiveDoc(doc)}
              >
                {doc}
              </DocumentItem>
            ))}
          </DocumentList>
        </Sidebar>
        <MainContent>
          <Content>
            <ButtonWrapper>
              <Button
                active={selectedTab === "funding"}
                onClick={() => setSelectTab("funding")}
              >
                #클라우드 펀딩
              </Button>
              <Button
                active={selectedTab === "volunteer"}
                onClick={() => setSelectTab("volunteer")}
              >
                #자원봉사 공고
              </Button>
            </ButtonWrapper>
            {selectedTab === "funding" ? (
              <FundingGrid>
                {Array.from({ length: 8 }).map((_, index) => (
                  <FundingCard key={index}>
                    <StyledImagePlaceholder>
                      <img src={BookMarkColorSVG} />
                    </StyledImagePlaceholder>
                    <Achived>680% 달성</Achived>
                    <FundingTitle>
                      자립준비청년들에게 사회로 나갈 준비를 도와주세요
                    </FundingTitle>
                    <StyledPostDetails>
                      <Institution>자립복지원</Institution>
                      <DaysLeft>30일 남음</DaysLeft>
                    </StyledPostDetails>
                  </FundingCard>
                ))}
              </FundingGrid>
            ) : (
              <VolunteerGrid>
                {Array.from({ length: 9 }).map((_, index) => (
                  <Card key={index}>
                    <DetailInCard>
                      <CardTitle>아이들을 위한 산타 모집</CardTitle>
                      <CardStartDate>2025.02.16~</CardStartDate>
                      <CardMax>10명 모집중</CardMax>
                      <DetailWrapper>
                        <CardAddresss>서울 강남구</CardAddresss>
                        <CardDeadLine>D-32</CardDeadLine>
                      </DetailWrapper>
                    </DetailInCard>
                    <DetailOutCard>
                      <CardNickname>자원보육원</CardNickname>
                      <img src={BookMarkColorSVG} />
                    </DetailOutCard>
                  </Card>
                ))}
              </VolunteerGrid>
            )}
          </Content>
          {/**페이지네이션  */}
        </MainContent>
      </Container>
    </>
  );
};

export default ScrapPage;
// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  font-family: Pretendard, sans-serif;
`;
const Sidebar = styled.div`
  width: 250px;
  background-color: #3e5879;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
`;
const DocumentList = styled.ul`
  list-style: none;
  border-bottom: 2px solid #ffffff;
  padding: 0;
  margin-top: 100px;
  width: 250px;
`;
interface DocumentItemProps {
  active: boolean;
}

const DocumentItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<DocumentItemProps>`
  background-color: ${({ active }) => (active ? "#3e5879" : "#3e5879")};
  cursor: pointer;
  &:hover {
    background-color: #adacc2;
  }
  border-top: 2px solid white;
  height: 55px;
`;
/* 메인 콘텐츠 */
const MainContent = styled.div`
  flex: 1;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-direction: column;
`;
const ButtonWrapper = styled.div`
  display: dlex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
interface ButtonProps {
  active: boolean;
}
const Button = styled.button<ButtonProps>`
  font-size: 25px;
  font-weight: 400;
  color: ${({ active }) => (active ? "#3E5879" : "#E6D9D2")};
  padding: 20px 16px;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? "#3E5879" : "#E6D9D2")};
  background: transparent;
  cursor: pointer;
  position: relative;
`;
const FundingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
  padding: 30px 80px;
`;
const FundingCard = styled.div`
  background-color: white;
  padding: 16px;
`;
const StyledImagePlaceholder = styled.div`
  width: 100%;
  height: 150px;
  background-color: #c0c7d6;
  border-radius: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    margin-top: 100px;
    margin-right: 10px;
  }
`;
const Achived = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
`;
const FundingTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;
const StyledPostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6c6c6c;
`;
const Institution = styled.div`
  font-weight: 500;
`;
const DaysLeft = styled.div`
  font-weight: bold;
  color: #3e5879;
`;
const VolunteerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
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
  height: 220px;
  padding: 15px;
  border-radius: 10px;
`;
const DetailInCard = styled.div`
  width: 100%;
  height: 180px;
  padding: 10px;
  background-color: #c0c7d6;
  border-radius: 8px;
`;
const CardTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 24px;
  font-weight: 700;
  color: black;
`;
const CardStartDate = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 400;
  color: black;
`;
const CardMax = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
  font-weight: 400;
  font-size: 20px;
  color: black;
`;
const DetailWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-left: 10px;
`;
const CardAddresss = styled.div`
  display: flex;
  font-size: 20px;
  color: black;
`;
const CardDeadLine = styled.div`
  display: flex;
  font-size: 20px;
  color: black;
  margin-right: 10px;
`;
const DetailOutCard = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
  color: white;
  font-weight: 400;
`;
const CardNickname = styled.div`
  color: black;
`;
