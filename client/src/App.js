// React Components
import { Route } from "react-router-dom";

// Custom Components
// import Success from "./screens/SuccessStarCity/Success";
// import NavBar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer/Footer";
import WhatsappBubble from "./components/WhatsappBubble/WhatsappBubble";

// Forms
import RegisterTenancy from "./components/RegisterTenancy";
import StripeHandler from "./components/RegisterTenantCard_RJ3/StripeHandlerComponent";

// Approved screens
import ApprovedTenantRimbo from "./screens/approvedTenantRimbo/ApprovedTenantRimbo.jsx";

// Multilingual
import { withNamespaces } from "react-i18next";

// Normalize & Generic styles
import "./styles/generic.scss";

const App = () => {
  return (
    <>
      {/* <NavBar /> */}

      <Route exact path="/register/tenancy" component={RegisterTenancy} />

      <Route
        exact
        path="/register/tenancy/:tenancyID/approved"
        component={ApprovedTenantRimbo}
      />

      <Route exact path="/register/card/:randomID" component={StripeHandler} />

      <WhatsappBubble />
      {/* <Footer /> */}
    </>
  );
};

export default withNamespaces()(App);
