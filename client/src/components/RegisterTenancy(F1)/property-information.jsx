// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom Components
import Input from "../Input";
import Button from "../Button";

// Validation
import { isProperty } from "./validation";

// Constants
import { UPDATE_PROPERTY_INFO } from "./constants";

// Styles imported
import styles from "./register-user.module.scss";

// Multilanguage
import { withNamespaces } from "react-i18next";

const PropertyDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});

  // Handle on change
  const handleProperty = ({ target }) => {
    setTenancy({
      type: UPDATE_PROPERTY_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    const errors = isProperty(tenancy.propertyDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };

  return (
    <form onSubmit={handleContinue}>
      <div className={styles.FormIntern}>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="building"
              value={tenancy.propertyDetails.building}
              label={t("F1SC.stepZero.building")}
              placeholder={t("F1SC.stepZero.buildingPL")}
              onChange={(e) => handleProperty(e)}
              error={errors.building}
            />
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="room"
              value={tenancy.propertyDetails.room}
              label={t("F1SC.stepZero.room")}
              placeholder={t("F1SC.stepZero.roomPL")}
              onChange={(e) => handleProperty(e)}
              error={errors.room}
            />
          </div>
        </div>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="rentAmount"
              value={tenancy.propertyDetails.rentAmount}
              label={t("F1SC.stepZero.rentAmount")}
              placeholder={t("F1SC.stepZero.rentAmountPL")}
              onChange={(e) => handleProperty(e)}
              error={errors.rentAmount}
            />
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="acceptanceCriteria"
              value={tenancy.propertyDetails.acceptanceCriteria}
              label={t("F1SC.stepZero.acceptance")}
              placeholder={t("F1SC.stepZero.acceptancePL")}
              onChange={(e) => handleProperty(e)}
              error={errors.acceptanceCriteria}
            />
          </div>
        </div>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <Input
              type="date"
              name="rentStartDate"
              value={tenancy.propertyDetails.rentStartDate}
              label={t("F1SC.stepZero.rentStartDate")}
              onChange={(e) => handleProperty(e)}
              error={errors.rentStartDate}
            />
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="date"
              name="rentEndDate"
              value={tenancy.propertyDetails.rentEndDate}
              label={t("F1SC.stepZero.rentEndDate")}
              onChange={(e) => handleProperty(e)}
              error={errors.rentEndDate}
            />
          </div>
        </div>
      </div>

      <div className={styles.AloneButtonContainer}>
        <Button type="submit">{t("nextStepButton")}</Button>
      </div>
    </form>
  );
};

PropertyDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(PropertyDetails);
