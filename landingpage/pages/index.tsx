import Footer from "../components/Footer";
import Header from "../components/Header";
import { Styles } from "../styles/styles";
import dynamic from 'next/dynamic'
import {
  useTranslation,
} from "next-export-i18n";

export default function Home() {
const Contact = dynamic(() => import("../components/ContactForm"));
const MiddleBlock = dynamic(() => import("../components/MiddleBlock"));
const Container = dynamic(() => import("../common/Container"));
const ScrollToTop = dynamic(() => import("../common/ScrollToTop"));
const ContentBlock = dynamic(() => import("../components/ContentBlock"));

const { t } = useTranslation();

  return (
    <>
      <Styles />
      <Header />
      <Container>
        <ScrollToTop />
        <ContentBlock
          type="right"
          title={t("content.intro.title")}
          content={t("content.intro.text")}
          button={[{"title": t("content.intro.button")}]}
          icon="intro.jpg"
          id="intro"
          />
        <MiddleBlock
          title={t("content.problem-statement.title")}
          content={t("content.problem-statement.text")}
          button={t("content.problem-statement.button")}
        />
        <ContentBlock
          type="left"
          title={t("content.about.title")}
          content={t("content.about.text")}
          section={t("content.about.section")}
          icon="about.jpg"
          id="about"
        />
        <ContentBlock
          type="right"
          title={t("content.mission.title")}
          content={t("content.mission.text")}
          icon="invest.jpg"
          id="mission"
        />
        <ContentBlock
          type="left"
          title={t("content.product.title")}
          content={t("content.product.text")}
          icon="elements-energy.jpg"
          id="product"
        />
        <Contact
          title={t("content.contact.title")}
          content={t("content.contact.text")}
          id="contact"
        />
      </Container>
      <Footer />
    </>
  );
}
