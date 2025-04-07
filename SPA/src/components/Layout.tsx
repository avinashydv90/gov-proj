import InfoCard from "./InfoCard";
import LayoutHeader from "./LayoutHeader";
import PeopleList from "./PeopleList";

const Layout = () => {
  return (
    <div className="min-h-[40%] m-0 md:m-5 lg:m-10">
      {/* Header */}
      <LayoutHeader />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-center px-4 gap-6 py-6">
        {/* Left Side (50%) */}
        <div className="w-full">
          <InfoCard />
        </div>

        {/* Right Side (20%) */}
        <div
          className="
            w-[300px] h-[400px]              // Base (mobile)
            md:w-[350px] md:h-[500px]        // Medium
            lg:w-[40%] lg:h-auto             // Large
            xl:w-[20%] xl:h-auto             // Extra large
            2xl:w-[20%] 2xl:h-auto           // 2x Extra large
          "
        >
          <PeopleList />
        </div>
      </div>
    </div>
  );
};

export default Layout;
