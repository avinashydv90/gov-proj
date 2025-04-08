import InfoCard from "./InfoCard";
import LayoutHeader from "./LayoutHeader";
import PeopleList from "./PeopleList";

const Layout = () => {
  return (
    <div className="min-h-[40%] m-0 md:m-5 lg:m-10">
      {/* Header */}
      <LayoutHeader />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6">
        {/* Left Side (8 columns) */}
        <div className="lg:col-span-8">
          <InfoCard />
        </div>

        {/* Right Side (4 columns) */}
        <div className="lg:col-span-4 w-full h-auto">
          <PeopleList />
        </div>
      </div>
    </div>
  );
};

export default Layout;
