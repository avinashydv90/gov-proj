import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Topbar from "./components/Topbar";
// import Topbar from "./components/Topbar";

function App() {
  return (
    <div className="font-sans">
      <div className="absolute top-0 left-0 w-full z-20">
        <Topbar />
      </div>

      <Outlet />

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
