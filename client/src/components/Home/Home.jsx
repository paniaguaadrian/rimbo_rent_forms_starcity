// Custom Components
import CustomHelmet from "../Helmet/CustomHelmet";

// Multi language
import { withNamespaces } from "react-i18next";

// Styles
import styles from "./Home.module.scss";

// Images
import StarcityImage from "../../images/starcity-image.png";

const Home = ({ t }) => {
  return (
    <>
      <CustomHelmet title={t("Home.header")} />
      <div className={styles.SuccessPageContainer}>
        <div className={styles.SuccessPageText}>
          <h1>{t("Home.title")}</h1>
          <h2>{t("Home.subtitle")}</h2>
          <p>{t("Home.text")}</p>
        </div>
        <div className={styles.SuccessPageImage}>
          <img src={StarcityImage} alt="Starcity" />
        </div>
      </div>
    </>
  );
};

export default withNamespaces()(Home);
