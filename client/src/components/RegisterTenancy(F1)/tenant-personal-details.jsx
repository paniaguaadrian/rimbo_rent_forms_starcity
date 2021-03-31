// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { nanoid } from "nanoid";

// Styles
import styles from "./register-user.module.scss";
import selectStyles from "../InputSelect/input.select.module.scss";

// Validation
import { isMoreTenant } from "./validation";

// Reducer Constants
import { UPDATE_TENANT_PERSONAL_INFO } from "./constants";

// Custom Comoponents
import Loader from "react-loader-spinner";
import InputCheck from "../InputCheck";
import Input from "../Input";
import InputFile from "../InputFile";
import Button from "../Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";

// Multilanguage
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// Google Maps Autocomplete
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_API_RIMBO_TENANCY_STARCITY,
  REACT_APP_API_RIMBO_TENANT,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const TenantPersonalDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});
  const [isProcessing, setProcessingTo] = useState(false);
  const [tenantsAddress, setTenantsAddress] = useState("");
  const [tenantsZipCode, setTenantsZipCode] = useState("");
  const [responseData, setResponseData] = useState([]); // eslint-disable-line
  // const [sent, setSent] = useState(false); // eslint-disable-line
  const [files, setFiles] = useState({
    DF: null,
    DB: null,
  });

  // Google Maps Address and Zip Code
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

  // Handle on change regular Data
  const handleTenant = ({ target }) => {
    setTenancy({
      type: UPDATE_TENANT_PERSONAL_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Handle on change Files
  const changeHandler = (event) => {
    const name = event.target.name;
    setFiles((files) => {
      const newFiles = { ...files };
      newFiles[name] = event.target.files[0];
      return newFiles;
    });
  };

  const ID = nanoid();
  const randomID = ID;
  const tenancyID = randomID;

  // Function to send => Email, emailData
  const sendAttachments = async (data) => {
    if (i18n.language === "en") {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/e1r`, {
        //  Agency
        agencyName: data.agent.agencyName,
        // Tenant
        tenantsName: data.tenant.tenantsName,
        tenantsEmail: data.tenant.tenantsEmail,
        tenantsPhone: data.tenant.tenantsPhone,
        tenantsAddress: data.tenant.tenantsAddress,
        tenantsZipCode: data.tenant.tenantsZipCode,
        documentType: data.tenant.documentType,
        documentNumber: data.tenant.documentNumber,
        monthlyNetIncome: data.tenant.monthlyNetIncome,
        jobType: data.tenant.jobType,
        documentImageFront: data.tenant.documentImageFront,
        documentImageBack: data.tenant.documentImageBack,
        randomID: data.tenant.randomID,
        //  Tenancy
        rentAmount: data.rentAmount,
        acceptanceCriteria: data.acceptanceCriteria,
        rentStartDate: data.rentStartDate,
        rentEndDate: data.rentEndDate,
        tenancyID: data.tenancyID,
        // Property
        building: data.property.building,
        room: data.property.room,
      });
    } else {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/e1r`, {
        //  Agency
        agencyName: data.agent.agencyName,
        // Tenant
        tenantsName: data.tenant.tenantsName,
        tenantsEmail: data.tenant.tenantsEmail,
        tenantsPhone: data.tenant.tenantsPhone,
        tenantsAddress: data.tenant.tenantsAddress,
        tenantsZipCode: data.tenant.tenantsZipCode,
        documentType: data.tenant.documentType,
        documentNumber: data.tenant.documentNumber,
        monthlyNetIncome: data.tenant.monthlyNetIncome,
        jobType: data.tenant.jobType,
        documentImageFront: data.tenant.documentImageFront,
        documentImageBack: data.tenant.documentImageBack,
        randomID: data.tenant.randomID,
        //  Tenancy
        rentAmount: data.rentAmount,
        acceptanceCriteria: data.acceptanceCriteria,
        rentStartDate: data.rentStartDate,
        rentEndDate: data.rentEndDate,
        tenancyID: data.tenancyID,
        // Property
        building: data.property.building,
        room: data.property.room,
      });
    }
  };

  // Function to get DB Data
  const getData = async () => {
    return fetch(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
    )
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server responds with error!" + res.status);
        }
        return res.json();
      })
      .then((responseData) => {
        setResponseData(responseData);
        // setSent((prevSent) => !prevSent);
        return responseData; // return data from here
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = isMoreTenant(tenancy.tenantPersonalDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setProcessingTo(true);

    //  Send regular data to DB
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY_STARCITY}`,
      {
        //  Agency
        agencyName: tenancy.agencyName,
        isAgentAccepted: tenancy.tenantPersonalDetails.isAgentAccepted,
        // Tenant
        tenantsName: tenancy.tenantContactDetails.tenantName,
        tenantsEmail: tenancy.tenantContactDetails.tenantEmail,
        tenantsPhone: tenancy.tenantContactDetails.tenantPhone,
        tenantsAddress: tenantsAddress,
        tenantsZipCode: tenantsZipCode,
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

    // Setting files before post
    const formData = new FormData();
    for (const key in files) {
      formData.append(key, files[key]);
    }
    formData.append("randomID", randomID);

    //  Send files to DB
    // ? Stored in a variable to play with it
    const result = await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/starcity/upload`,
      formData,
      { randomID }
    );

    // This function takes getData as data and w8 to sendAttachments only, if there is data fetched.
    const executeResult = async () => {
      const data = await getData();
      if (data) await sendAttachments(data);
    };

    // If the post of the files to DB is succeed, we execute the function below and change step
    if (result) {
      try {
        // setSent(true);
        await executeResult();
        setStep((prevStep) => prevStep + 1);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
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
              <div className={selectStyles.selectContainer}>
                <label className={selectStyles.selectLabel} htmlFor="jobType">
                  {t("RJ2.jobType")}
                </label>
                <select
                  required
                  name="jobType"
                  className={selectStyles.selectInput}
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
              <div className={selectStyles.selectContainer}>
                <label
                  className={selectStyles.selectLabel}
                  htmlFor="documentType"
                >
                  {t("RJ2.documentType")}
                </label>
                <select
                  required
                  name="documentType"
                  className={selectStyles.selectInput}
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

                  <option
                    name="documentType"
                    value={t("RJ2.documentTypeThree")}
                  >
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
          <div className={styles.TermsContainer}>
            <InputCheck
              type="checkbox"
              name="isAgentAccepted"
              id="terms"
              value={tenancy.tenantPersonalDetails.isAgentAccepted}
              placeholder="Accept our terms and conditions"
              onChange={(e) => handleTenant(e)}
              required
            />
            <p>
              {t("F1SC.stepZero.pp1")}{" "}
              <a
                href="https://rimbo.rent/en/privacy-policy/"
                target="_blank"
                rel="noreferrer"
                className="link-tag"
              >
                {" "}
                {t("F1SC.stepZero.pp2")}
              </a>{" "}
              {t("F1SC.stepZero.pp3")}{" "}
              <a
                href="https://rimbo.rent/en/cookies-policy/"
                target="_blank"
                rel="noreferrer"
                className="link-tag"
              >
                {" "}
                {t("F1SC.stepZero.pp4")}
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.ButtonContainer}>
          <Button onClick={() => setStep(step - 1)} type="button">
            {t("prevStepButton")}
          </Button>
          {isProcessing ? (
            <Loader
              type="Puff"
              color="#01d2cc"
              height={50}
              width={50}
              timeout={3000} //3 secs
            />
          ) : (
            <Button disabled={isProcessing} type="submit">
              {t("submitButton")}
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

TenantPersonalDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(TenantPersonalDetails);
