// React Components
import { Route } from "react-router-dom";

// Multilingual
import { withNamespaces } from "react-i18next";

// Custom Components
import WhatsappBubble from "./components/WhatsappBubble/WhatsappBubble";

// Forms
import RegisterTenancy from "./components/RegisterTenancy(F1)";
import StripeHandler from "./components/RegisterTenantCard_RJ3/StripeHandlerComponent";

// Approved screens
import ApprovedTenantRimbo from "./screens/approvedTenantRimbo/ApprovedTenantRimbo.jsx";

// Normalize & Generic styles
import "./styles/generic.scss";

const App = () => {
  return (
    <>
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
