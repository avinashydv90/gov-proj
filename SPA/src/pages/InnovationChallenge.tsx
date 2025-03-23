import { Outlet } from "react-router-dom";

const InnovationChallenge = () => {
  return (
    <div>
      <h1>Innovation Challenge</h1>
      <Outlet /> {/* ✅ This is where child routes will be rendered */}
    </div>
  );
};

export default InnovationChallenge;
