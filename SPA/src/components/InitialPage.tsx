import App from "../App";

const InitialPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary max-w-full text-balance">
        School Management System
      </h1>
      <App></App>
    </div>
  );
};

export default InitialPage;
