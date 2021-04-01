// React components
import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Custom Components
import NavBar from "../../components/NavBar/NavBar";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import Footer from "../../components/Footer/Footer";

// Reducer
import { TenantReducer, DefaultTenant } from "./approved_tenant_rimbo-reducer";

// Styles
import styles from "./approved-user.module.scss";

// Multi language
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_BASE_URL_EMAIL,
  REACT_APP_API_RIMBO_TENANT,
} = process.env;

const ApprovedTenantRimbo = ({ t }) => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;
  const [tenant] = useReducer(TenantReducer, DefaultTenant);

  const [state, setState] = useState(null); // eslint-disable-line

  useEffect(() => {
    // Simplify fetchUserData.
    const fetchUserData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
      );

    // Add body to post decision. So we can send data.
    const postDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/approved`,
        body
      );

    const processDecision = async () => {
      const { data: tenancyData } = await fetchUserData();
      // let's console.log userData here, so we know it is in the right format.
      // console.log(tenancyData);

      const postBody = {
        // use some logic based on tenancyData here to make the postBody
        isRimboAccepted: tenant.isRimboAccepted,
        randomID: tenancyData.tenant.randomID,
      };

      // If the above use of {data} is correct it should be correct here too.
      const { data: decisionResult } = await postDecision(postBody);
      // console.log(postBody);

      const { tenantsName, tenantsEmail, randomID } = tenancyData.tenant;
      const { agencyName } = tenancyData.agent;
      const { building, room } = tenancyData.property;
      const { tenancyID, rentStartDate, rentEndDate } = tenancyData;

      if (tenancyData.tenant.isRimboAccepted === false) {
        if (i18n.language === "en") {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/e2tt`, {
            tenantsName,
            tenantsEmail,
            randomID,
            agencyName,
            building,
            room,
            tenancyID,
            rentStartDate,
            rentEndDate,
          });
        } else {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/e2tt`, {
            tenantsName,
            tenantsEmail,
            randomID,
            agencyName,
            building,
            room,
            tenancyID,
            rentStartDate,
            rentEndDate,
          });
        }
      }

      setState(decisionResult);
    };

    processDecision();
  }, [randomID, tenant.isRimboAccepted, tenancyID]);

  return (
    <>
      <CustomHelmet title={t("approvedRimbo.header")} />
      <NavBar />
      <div className={styles.SuccessPageContainer}>
        <div className={styles.SuccessPageText}>
          <h1>{t("approvedRimbo.title")}</h1>
          <h2>{t("approvedRimbo.subtitle")}</h2>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withNamespaces()(ApprovedTenantRimbo);
