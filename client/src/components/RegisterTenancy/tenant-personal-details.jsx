import React, { useState } from "react";
import PropTypes from "prop-types";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { withNamespaces } from "react-i18next";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import axios from "axios";
import { nanoid } from "nanoid";
import Input from "../Input";
import InputFile from "../InputFile";
import Button from "../Button";
import { isMoreTenant } from "./validation";
import { UPDATE_TENANT_PERSONAL_INFO } from "./constants";
import styles from "../RegisterTenancy/register-user.module.scss";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY_STARCITY,
  REACT_APP_API_RIMBO_TENANT,
} = process.env;

const TenantPersonalDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});
  const [tenantsAddress, setTenantsAddress] = useState("");
  const [tenantsZipCode, setTenantsZipCode] = useState("");
  const [files, setFiles] = useState({
    DF: null,
    DB: null,
  });

  // ! Google Maps Address and Zip Code
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);

    const addressComponents = results[0].address_components;

    const route = "route";
    const locality = "locality";
    const streetNumber = "street_number";
    const postalCode = "postal_code";

    if (
      addressComponents[0].types[0] === route &&
      addressComponents[1].types[0] === locality
    ) {
      setTenantsZipCode("");
      setTenantsAddress(results[0].formatted_address);
    } else if (
      addressComponents[0].types[0] === streetNumber && // number
      addressComponents[1].types[0] === route && // Street
      addressComponents[2].types[0] === locality && // Barcelona
      addressComponents[6].types[0] === postalCode
    ) {
      setTenantsZipCode(results[0].address_components[6].long_name);
      setTenantsAddress(results[0].formatted_address);
    }

    setTenantsAddress(results[0].formatted_address);
  };

  // ! Handle on change Rest of Data
  const handleTenant = ({ target }) => {
    setTenancy({
      type: UPDATE_TENANT_PERSONAL_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // ! Files
  const changeHandler = (event) => {
    const name = event.target.name;
    setFiles((files) => {
      const newFiles = { ...files };
      newFiles[name] = event.target.files[0];
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = isMoreTenant(tenancy.tenantPersonalDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const ID = nanoid();
    const randomID = ID;

    // ! Send data to Rimbo_API without files
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY_STARCITY}`,
      {
        //  Agency
        agencyName: tenancy.agencyName,
        isAgentAccepted: tenancy.propertyDetails.isAgentAccepted,
        // Tenant
        tenantsName: tenancy.tenantContactDetails.tenantName,
        tenantsEmail: tenancy.tenantContactDetails.tenantEmail,
        tenantsPhone: tenancy.tenantContactDetails.tenantsPhone,
        documentType: tenancy.tenantPersonalDetails.documentType,
        documentNumber: tenancy.tenantPersonalDetails.documentNumber,
        monthlyNetIncome: tenancy.tenantPersonalDetails.monthlyNetIncome,
        jobType: tenancy.tenantPersonalDetails.jobType,
        randomID: randomID,
        //  Tenancy
        rentAmount: tenancy.propertyDetails.rentAmount,
        acceptanceCriteria: tenancy.propertyDetails.acceptanceCriteria,
        rentStartDate: tenancy.propertyDetails.rentStartDate,
        rentEndDate: tenancy.propertyDetails.rentEndDate,
        tenancyID: randomID,
        // Property
        building: tenancy.propertyDetails.building,
        room: tenancy.propertyDetails.room,
      }
    );
    // ! Send FILES to Rimbo_API
    const formData = new FormData();
    for (const key in files) {
      formData.append(key, files[key]);
    }
    formData.append("randomID", randomID);

    // ! Post to Rimbo API (files/images)
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/starcity/upload`,
      formData,
      { randomID }
    );
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className={styles.FormIntern}>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <Input
              type="number"
              name="monthlyNetIncome"
              value={tenancy.tenantPersonalDetails.monthlyNetIncome}
              label={t("RJ2.monthlyNetIncome")}
              placeholder={t("RJ2.monthlyNetIncomePL")}
              onChange={(e) => handleTenant(e)}
              error={errors.monthlyNetIncome}
            />
          </div>
          <div className={styles.FormLeft}>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="jobType">
                {t("RJ2.jobType")}
              </label>
              <select
                required
                name="jobType"
                className={styles.selectInput}
                value={tenancy.tenantPersonalDetails.jobType}
                onChange={(e) => handleTenant(e)}
                error={errors.jobType}
              >
                <option value="">{t("RJ2.jobTypePL")}</option>

                <option name="jobType" value={t("RJ2.jobTypeOne")}>
                  {t("RJ2.jobTypeOne")}
                </option>

                <option name="jobType" value={t("RJ2.jobTypeTwo")}>
                  {t("RJ2.jobTypeTwo")}
                </option>

                <option name="jobType" value={t("RJ2.jobTypeThree")}>
                  {t("RJ2.jobTypeThree")}
                </option>

                <option name="jobType" value={t("RJ2.jobTypeFour")}>
                  {t("RJ2.jobTypeFour")}
                </option>

                <option name="jobType" value={t("RJ2.jobTypeFive")}>
                  {t("RJ2.jobTypeFive")}
                </option>

                <option name="jobType" value={t("RJ2.jobTypeSix")}>
                  {t("RJ2.jobTypeSix")}
                </option>

                <option name="jobType" value={t("RJ2.jobTypeSeven")}>
                  {t("RJ2.jobTypeSeven")}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            {/* Google maps Autocomplete */}
            <PlacesAutocomplete
              value={tenantsAddress}
              onChange={setTenantsAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <Input
                    id="googleInput"
                    {...getInputProps()}
                    label={t("RJ2.tenantsAddress")}
                    placeholder={t("RJ2.tenantsAddressPL")}
                    required
                  />
                  <div className={styles.GoogleSuggestionContainer}>
                    {/* display sugestions */}
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map((suggestion, place) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#24c4c48f"
                          : "#fff",
                        cursor: "pointer",
                      };
                      return (
                        <div
                          className={styles.GoogleSuggestion}
                          {...getSuggestionItemProps(suggestion, {
                            style,
                          })}
                          key={place}
                        >
                          <LocationOnIcon />
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="rentalPostalCode"
              id="rentalPostalCode"
              value={tenantsZipCode}
              label={t("RJ2.tenantsZipCode")}
              placeholder={t("RJ2.tenantsZipCodePL")}
              onChange={setTenantsZipCode}
              disabled
            />
          </div>
        </div>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="documentType">
                {t("RJ2.documentType")}
              </label>
              <select
                required
                name="documentType"
                className={styles.selectInput}
                value={tenancy.tenantPersonalDetails.documentType}
                onChange={(e) => handleTenant(e)}
                error={errors.documentType}
              >
                <option value="">{t("RJ2.documentTypePL")}</option>

                <option name="documentType" value={t("RJ2.documentTypeOne")}>
                  {t("RJ2.documentTypeOne")}
                </option>

                <option name="documentType" value={t("RJ2.documentTypeTwo")}>
                  {t("RJ2.documentTypeTwo")}
                </option>

                <option name="documentType" value={t("RJ2.documentTypeThree")}>
                  {t("RJ2.documentTypeThree")}
                </option>

                <option name="documentType" value={t("RJ2.documentTypeFour")}>
                  {t("RJ2.documentTypeFour")}
                </option>
              </select>
            </div>
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="documentNumber"
              value={tenancy.tenantPersonalDetails.documentNumber}
              label={t("RJ2.documentNumber")}
              placeholder={t("RJ2.documentNumberPL")}
              onChange={(e) => handleTenant(e)}
              error={errors.documentNumber}
            />
          </div>
        </div>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <InputFile
              type="file"
              name="DF"
              label={t("RJ2.DF")}
              onChange={changeHandler}
              required
            />
          </div>
          <div className={styles.FormLeft}>
            <InputFile
              type="file"
              name="DB"
              label={t("RJ2.DB")}
              onChange={changeHandler}
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.ButtonContainer}>
        <Button type="submit">{t("submitButton")}</Button>
      </div>
    </form>
  );
};

TenantPersonalDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(TenantPersonalDetails);
