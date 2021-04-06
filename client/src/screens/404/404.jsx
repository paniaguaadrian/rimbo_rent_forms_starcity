// React Components
import React from "react";

// Custom Components
import WhatsappBubble from "../../components/WhatsappBubble/WhatsappBubble";
import Component404 from "../../components/404/Component404";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

// Multi language
import { withNamespaces } from "react-i18next";

// Images
import Image404 from "../../images/undraw_warning_cyit.svg";

const Page404 = ({ t }) => {
  return (
    <>
      <NavBar />
      <Component404
        title={t("404Page.title")}
        subtitle={t("404Page.subtitle")}
        paragraph={t("404Page.paragraph")}
        imageSRC={Image404}
        imageAlt="404 error image"
      />
      <WhatsappBubble />
      <Footer />
    </>
  );
};

export default withNamespaces()(Page404);
