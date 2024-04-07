import { Row, Col } from "antd";

import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";

import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  Chat,
  Empty,
  FooterContainer,
  Language,
  Label,
  LanguageSwitch,
  LanguageSwitchContainer,
} from "./styles";
import { useRouter } from "next/router";

import {
  useTranslation,
  useLanguageQuery,
  LanguageSwitcher,
} from "next-export-i18n";

interface SocialLinkProps {
  href: string;
  src: string;
}

const Footer = () => {
  const router = useRouter();

  const handleChange = (language: string) => {
    // i18n.changeLanguage(language);
    router.push("/", "/", { locale: language });
  };

  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };
  const { t } = useTranslation();

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Language>{"Contact"}</Language>
              <Large href="/">{"Tell us everything"}</Large>
              <Para>{`Do you have any question? Feel free to reach out.`}</Para>
              <a href="mailto:l.ElementsDAO@gmail.com">
                <Chat>{`Let's Chat`}</Chat>
              </a>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{"Policy"}</Title>
              <Large href="/" left="true">
                {"Application Security"}
              </Large>
              <Large left="true" href="/">
                {"Software Principles"}
              </Large>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Empty />
              <Large left="true" href="/">
                {"Support Center"}
              </Large>
              <Large left="true" href="/">
                {"Customer Support"}
              </Large>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Empty />
              <Language>{"Address"}</Language>
              <Para>ElementsDAO</Para>
              <Para>1337 Forrest Street</Para>
              <Para>Metaverse</Para>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{"Company"}</Title>
              <Large left="true" href="/">
                {"About"}
              </Large>
              <Large left="true" href="/">
                {"Blog"}
              </Large>
              <Large left="true" href="/">
                {"Press"}
              </Large>
              <Large left="true" href="/">
                {"Careers & Culture"}
              </Large>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
              <Label htmlFor="select-lang">{"Language"}</Label>
              <LanguageSwitchContainer>
                {/* <LanguageSwitch onClick={() => handleChange("en")}>
                  <SvgIcon
                    src="united-states.svg"
                    aria-label="homepage"
                    width="30px"
                    height="30px"
                  />
                </LanguageSwitch>
                <LanguageSwitch onClick={() => handleChange("de")}>
                  <SvgIcon
                    src="germany.png"
                    aria-label="homepage"
                    width="30px"
                    height="30px"
                  />
                </LanguageSwitch> */}
                <nav>
                  {t("ui.languageSwitcher")}
                  <LanguageSwitcher lang="de">de</LanguageSwitcher> |{" "}
                  <LanguageSwitcher lang="en">en</LanguageSwitcher>
                </nav>
              </LanguageSwitchContainer>
            </Col>
          </Row>
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: "3rem" }}
          >
            <NavLink href="/">
              <LogoContainer>
                <SvgIcon
                  src="logo.svg"
                  aria-label="homepage"
                  width=""
                  height="42px"
                />
              </LogoContainer>
            </NavLink>
            <FooterContainer>
              <SocialLink
                href="https://github.com/ElementsDAO"
                src="github.svg"
              />
              <SocialLink
                href="https://twitter.com/ElementsDAO"
                src="twitter.svg"
              />
              <SocialLink
                href="https://www.linkedin.com/in/ElementsDAO"
                src="linkedin.svg"
              />
              <SocialLink
                href="https://medium.com/@ElementsDAO/"
                src="medium.svg"
              />
            </FooterContainer>
          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default Footer;
