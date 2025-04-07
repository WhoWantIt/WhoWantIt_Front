import styled from "styled-components";
import Logo from "../assets/home/logo.svg";

const FooterContainer = styled.footer`
  background-color: #fff;
  padding: 20px;
  text-align: center;
  margin-top: auto;
  border-top: 1px solid #ccc;
`;

const FooterLogoImage = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 10px;
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Copyright = styled.a`
  font-size: 12px;
  color: #999;
  margin-top: 20px;
  margin-bottom: 80px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogoImage src={Logo} alt="WhoWantIt Logo" />
      <FooterInfo>
        <Copyright href="https://github.com/WhoWantIt">
          Developed by Jayeon Koo, Younghyun Kim, Seongyoung Baek, Gaeul Hong, Heejung Kim
        </Copyright>
      </FooterInfo>
    </FooterContainer>
  );
};

export default Footer;
