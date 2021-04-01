// React Components
import React from "react";

// Custom Components
import CustomHelmet from "../../components/Helmet/CustomHelmet";

// Styles
import styles from "./success.module.scss";

// Multi Language
import { withNamespaces } from "react-i18next";

const Success = ({ t }) => {
  return (
    <>
      <CustomHelmet title="Badi & Rimbo - The new way to rent" />
      <div className={styles.SuccessPageContainer}>
        <div className={styles.SuccessPageText}>
          <h1>{t("Success.title")}</h1>
          <h2>{t("Success.subtitle")}</h2>
          <p>{t("Success.subtext")}</p>
        </div>
      </div>
    </>
  );
};

export default withNamespaces()(Success);
