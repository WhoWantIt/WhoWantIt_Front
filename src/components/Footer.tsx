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

const FooterLinks = styled.div`
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  color: #666;
  text-decoration: none;
  margin: 0 10px;
  font-size: 14px;
`;

const Copyright = styled.p`
  font-size: 12px;
  color: #999;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogoImage src={Logo} alt="WhoWantIt Logo" />
      <FooterInfo>
        <FooterLinks>
          <FooterLink href="#">Mobile app</FooterLink>
          <FooterLink href="#">Community</FooterLink>
          <FooterLink href="#">Company</FooterLink>
        </FooterLinks>
        <Copyright>© Photo, Inc. 2019. We love our users!</Copyright>
      </FooterInfo>
    </FooterContainer>
  );
};

export default Footer;
