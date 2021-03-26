// React Components
import { Route } from "react-router-dom";

// Custom Components
import Success from "./screens/SuccessStarCity/Success";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import WhatsappBubble from "./components/WhatsappBubble/WhatsappBubble";

// Forms
import RegisterTenancy from "./components/RegisterTenancy";

// Multilingual
import { withNamespaces } from "react-i18next";

// Normalize & Generic styles
import "./styles/generic.scss";

const App = () => {
  return (
    <>
      <NavBar />

      <Route exact path="/register/tenancy" component={RegisterTenancy} />

      <Route exact path="/register/tenancy/success" component={Success} />

      <WhatsappBubble />
      <Footer />
    </>
  );
};

export default withNamespaces()(App);
