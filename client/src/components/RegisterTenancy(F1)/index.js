// React Components
import React, { useReducer, useState } from "react";

// Custom Components
import FormSteps from "./form-steps";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

// Reducer import
import { TenancyReducer, DefaultTenancy } from "./tenancy-reducer";

// Styles imported
import styles from "./register-user.module.scss";

// Multilanguage
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

const RegisterTenancy = ({ t }) => {
  let [step, setStep] = useState(0);

  const [tenancy, setTenancy] = useReducer(TenancyReducer, DefaultTenancy);

  let steps = FormSteps(step, setStep, tenancy, setTenancy);

  return (
    <>
      <NavBar />
      <div className={styles.RegisterContainer}>
        {step === 0 || step === 1 || step === 2 ? (
          <div className={styles.Register}>
            <h1>{t("F1SC.header.title")}</h1>
            <div className={styles.ExtraInfoContainer}>
              <p>{t("F1SC.header.subtitleOne")}</p>
              <p>{t("F1SC.header.subtitleTwo")}</p>
            </div>
            {i18n.language === "es" ? (
              <h4>
                Paso {step + 1} / {steps.length - 1} -{" "}
                <span>{steps[`${step}`].titleEs}</span>
              </h4>
            ) : (
              <h4>
                Step {step + 1} / {steps.length - 1} -{" "}
                <span>{steps[`${step}`].title}</span>
              </h4>
            )}
          </div>
        ) : null}

        <div className={styles.FormContent}>{steps[`${step}`].content}</div>
      </div>
      <Footer />
    </>
  );
};

export default withNamespaces()(RegisterTenancy);
