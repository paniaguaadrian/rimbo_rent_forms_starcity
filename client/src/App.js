// React Components
import { Route } from "react-router-dom";

// Multilingual
import { withNamespaces } from "react-i18next";

// Custom Components
import WhatsappBubble from "./components/WhatsappBubble/WhatsappBubble";

// General Screens
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import ApprovedTenantRimbo from "./screens/approvedTenantRimbo/ApprovedTenantRimbo.jsx";
import HomePage from "./screens/HomePage/HomePage";

// Form Screens
import RegisterTenancy from "./screens/F1_RegisterTenancy";
import StripeHandler from "./screens/F2_RegisterTenantCard/StripeHandlerComponent";

// Normalize & Generic styles
import "./styles/generic.scss";

const App = () => {
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/terms" component={TermsAndConditions} />
      <Route exact path="/register/tenancy" component={RegisterTenancy} />
      <Route
        exact
        path="/register/tenancy/:tenancyID/approved"
        component={ApprovedTenantRimbo}
      />
      <Route exact path="/register/card/:randomID" component={StripeHandler} />
      <WhatsappBubble />
    </>
  );
};

export default withNamespaces()(App);
