import LayoutHeader from "./LayoutHeader";
import PeopleList from "./PeopleList";
import YojnaCarousel from "./YojnaCarousel";

const Layout = () => {
  return (
    <div className="min-h-[40%] m-0 md:m-5 lg:m-5">
      {/* Header */}
      <LayoutHeader />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-max">
        {/* Left Side (8 columns) */}
        <div
          className="lg:col-span-8 h-auto"
          style={{ padding: "10px 2.5px 5px 0px" }}
        >
          {/* <InfoCard /> */}
          <YojnaCarousel />
        </div>

        {/* Right Side (4 columns) */}
        <div
          className="lg:col-span-4 w-full h-auto"
          style={{ padding: "10px 2.5px 5px 0px" }}
        >
          <PeopleList />
        </div>
      </div>
    </div>
  );
};

export default Layout;
