// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Breadcrumbs from "./components/Breadcrumbs";
import Footer from "./components/Footer";
// import { Button } from "react-bootstrap";
import Header from "./components/Header";
import NavigationMenu from "./components/NavigationMenu";
import { Outlet } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <NavigationMenu />
      <Breadcrumbs />
      <Outlet />
      <Footer />

      {/* <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/introduction" element={<GIGW />} />
          <Route
            path="/innovation-challenge"
            element={<InnovationChallenge />}
          />
        </Routes>
      </div> */}
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Button variant="primary">Click Me</Button> */}
    </>
  );
}

export default App;
