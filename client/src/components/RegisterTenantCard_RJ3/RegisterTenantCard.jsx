// React Components
import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";

import { useParams } from "react-router-dom";
import axios from "axios";

import { TenantStripeReducer, DefaultTenant } from "./tenantStripe-reducer";

// Stripe Components
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Reducer-Constants
import { UPDATE_NEWTENANT_INFO } from "./tenantStripe-constants";

// Multi language
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

import NavBar from "../NavBarCentered/NavBar";

import RimboLogo from "../../images/rimbo-logo.png";
import StripeLogo from "../../images/secure-payments.png";
import StarCityImage from "../../images/starcity-image.png";

// Styles
import Loader from "react-loader-spinner";
import styles from "../RegisterTenancy(F1)/register-user.module.scss";
import style from "./register-card.module.scss";
import "./CardSection.css";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "14px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_BASE_URL_EMAIL,
  REACT_APP_BASE_URL_STRIPE,
  REACT_APP_API_RIMBO_TENANT_STRIPE,
} = process.env;

const RegisterTenantCard = ({ t }) => {
  let { randomID } = useParams();
  const tenancyID = randomID;

  const [tenant, setTenant] = useReducer(TenantStripeReducer, DefaultTenant);

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [tenancyData, setTenancyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null); //eslint-disable-line

  useEffect(() => {
    const getData = () => {
      fetch(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!" + res.status);
          }
          return res.json();
        })
        .then(
          (tenancyData) => {
            setTenancyData(tenancyData);
            setLoading(false);
          },
          (err) => {
            setErr(err);
            setLoading(false);
          }
        );
    };
    getData();
  }, [tenancyID]);

  // Handle on change
  const handleNewTenant = ({ target }) => {
    setTenant({
      type: UPDATE_NEWTENANT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    const tenantsEmail = document.getElementById("email").innerHTML;
    const tenantsName = document.getElementById("name").innerHTML;
    const tenantsPhone = document.getElementById("phone").innerHTML;
    const timestamps = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    const cardElement = elements.getElement("card");

    setProcessingTo(true);

    try {
      // ! Post a el backend de stripe en formularios
      const { data: client_secret } = await axios.post(
        `${REACT_APP_BASE_URL_STRIPE}/card-wallet`,
        {
          tenantsName,
          tenantsEmail,
        }
      );

      const { error } = await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: tenantsName,
            email: tenantsEmail,
            phone: tenantsPhone,
          },
        },
      });

      if (error) {
        setCheckoutError("* Rellena todos los campos del formulario.");
        setProcessingTo(false);
        return;
      } else {
        setIsSuccessfullySubmitted(true);

        // ! post a nuestra BDD
        await axios.post(
          `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT_STRIPE}/${randomID}`,
          {
            isAccepted: tenant.isAccepted,
            randomID: randomID,
          }
        );

        await axios.post(
          `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}/rimbo/start-service`,
          { tenancyID: tenancyID, rentStart: tenant.rentStart }
        );

        // ! Post to Email service
        if (i18n.language === "en") {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/e3`, {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            timestamps,
            agencyName: tenancyData.agent.agencyName,
            building: tenancyData.property.building,
            rentStartDate: tenancyData.rentStartDate,
            rentEndDate: tenancyData.rentEndDate,
          });
        } else {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/e3`, {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            timestamps,
            agencyName: tenancyData.agent.agencyName,
            building: tenancyData.property.building,
            rentStartDate: tenancyData.rentStartDate,
            rentEndDate: tenancyData.rentEndDate,
          });
        }
      }
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="La plataforma de alquiler sin depósitos. Descubre una nueva forma de alquilar. Rimbo ahorra al inquilino meses de depósito a la vez que brinda más protección al propietario."
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        <title>{t("RJ3.header")}</title>
      </Helmet>
      <NavBar />
      {!isSuccessfullySubmitted ? (
        <div className={styles.RegisterContainer}>
          {loading ? (
            <div className={styles.Register}>
              <Loader
                type="Puff"
                color="#01d2cc"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </div>
          ) : (
            <>
              <div className={style.BackgroundImage}>
                <div className={style.Register}>
                  <h1>
                    <span>{t("F2TT.titleOne")}</span>
                    {t("F2TT.titleTwo")}
                    <span>!</span>
                  </h1>
                  {/* <div className={styles.ExtraInfoContainer}>
                  <h2>{t("RJ3.subtitle")}</h2>
                  <div>
                    {tenancyData.product === "Administración" ? (
                      <p>
                        {t("RJ3.warningOne")}
                        <span> {t("RJ3.warningTwo")}</span>
                      </p>
                    ) : (
                      <p>
                        {t("RJ3.warningOne")}{" "}
                        <span>{t("RJ3.warningThree")}</span>
                      </p>
                    )}
                  </div>
                </div> */}
                </div>
                <div className={style.ContainerCard}>
                  <div className={style.Form_header_left}>
                    <p>{t("F2TT.leftTextOne")}</p>
                    <p className={style.important_p}>{t("F2TT.leftTextTwo")}</p>
                    <p>{t("F2TT.leftTextThree")}</p>
                    <div className={style.rimbo_sign}>
                      <h4>Powered by</h4>
                      <img src={RimboLogo} alt="Rimbo Rent Logo" />
                    </div>
                  </div>

                  <form onSubmit={handleFormSubmit}>
                    <div className={style.Form_container}>
                      <div className={style.Form_element}>
                        <h4>{t("F2TT.name")}</h4>
                        <p id="name">{tenancyData.tenant.tenantsName}</p>
                      </div>
                      <div className={style.Form_element}>
                        <h4>{t("F2TT.email")}</h4>{" "}
                        <p id="email">{tenancyData.tenant.tenantsEmail}</p>
                      </div>

                      <div className={style.Form_element}>
                        <h4>{t("F2TT.phone")}</h4>
                        <p id="phone">{tenancyData.tenant.tenantsPhone}</p>
                      </div>

                      <label className={style.StripeCard}>
                        <h3>{t("F2TT.creditCard")}</h3>
                        <h4>{t("F2TT.subcreditcard")}</h4>
                        <CardElement
                          options={CARD_ELEMENT_OPTIONS}
                          onChange={handleCardDetailsChange}
                          className={style.tarjeta}
                        />
                        <p>{t("F2TT.warningcreditcard")}</p>
                      </label>

                      <div className={styles.ErrorInput}>
                        <p className="error-message">{checkoutError}</p>
                      </div>

                      <div className={style.TermsContainerStripe}>
                        <input
                          type="checkbox"
                          required
                          name="isAccepted"
                          id="terms"
                          value={tenant.isAccepted}
                          onChange={(e) => handleNewTenant(e)}
                        />
                        <p>
                          Enviando tus datos confirmas que has leído y aceptas
                          los
                          <a
                            href="https://rimbo.rent/politica-privacidad/"
                            target="_blank"
                            rel="noreferrer"
                            className="link-tag"
                          >
                            {" "}
                            Términos y condiciones
                          </a>
                          ,
                          <a
                            href="https://rimbo.rent/politica-privacidad/"
                            target="_blank"
                            rel="noreferrer"
                            className="link-tag"
                          >
                            {" "}
                            Política de Privacidad
                          </a>
                          ,
                          <a
                            href="https://rimbo.rent/politica-privacidad/"
                            target="_blank"
                            rel="noreferrer"
                            className="link-tag"
                          >
                            {" "}
                            Política de Cookies
                          </a>
                          de Rimbo Rent.
                        </p>
                      </div>
                      <div className={style.buttonContainer}>
                        {isProcessing ? (
                          <Loader
                            type="Puff"
                            color="#01d2cc"
                            height={50}
                            width={50}
                            timeout={3000} //3 secs
                          />
                        ) : (
                          <button disabled={isProcessing || !stripe}>
                            {t("RJ3.authorize")}
                          </button>
                        )}
                      </div>
                      <div className={style.security_container}>
                        <img
                          className={style.stripe_logo}
                          src={StripeLogo}
                          alt="Stripe Security Payment Logo"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={style.success}>
          <>
            <div className={style.hero_section_container}>
              <h1>You are already part of StarCity!</h1>
            </div>
            <main className={style.form_full_container_success}>
              <div className={style.form_header_left_success}>
                <p>Genial, ¡hemos recibido tus detalles!</p>
                <p>
                  Nos pondremos en contacto contigo en breve para completar el
                  proceso.
                </p>
              </div>
              <div className={style.success_container_right}>
                <img src={StarCityImage} alt="StarCity co-living logo" />
              </div>
            </main>
            <div className={style.rimbo_sign_success}>
              <h4>Powered by</h4>
              <img src={RimboLogo} alt="Rimbo Rent Logo" />
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default withNamespaces()(RegisterTenantCard);
