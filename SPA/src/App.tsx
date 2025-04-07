import "./App.css";
import Carousel from "./components/Caroucel";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Layout from "./components/Layout";
// import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="font-sans">
      {/* <Topbar /> */}
      <Carousel />
      <Layout />

      <Gallery />
      <Footer />

      {/* <Header />
      <Navbar />
      <HeroSection />
      <Services />
      <Gallery />
      <Footer /> */}
    </div>
  );
}

export default App;
