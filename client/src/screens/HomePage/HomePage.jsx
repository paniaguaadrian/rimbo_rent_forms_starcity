// Custom Components
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Home from "../../components/Home/Home";
import WhatsappBubble from "../../components/WhatsappBubble/WhatsappBubble";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Home />
      <Footer />
      <WhatsappBubble />
    </>
  );
};

export default HomePage;
