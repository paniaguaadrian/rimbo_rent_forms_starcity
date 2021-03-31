// React Components
import React from "react";
import PropTypes from "prop-types";

// Imported Styles
import styles from "./register-user.module.scss";

// Multi language
import { withNamespaces } from "react-i18next";

const Completed = ({ tenancy, t }) => {
  return (
    <div className={styles.CompleteContainer}>
      <div className={styles.CompleteText}>
        <h1>{t("F1SC.completed.title")}</h1>
        <h3>{t("F1SC.completed.subtitle")} </h3>
      </div>
    </div>
  );
};

Completed.propTypes = {
  tenancy: PropTypes.object,
};

export default withNamespaces()(Completed);
