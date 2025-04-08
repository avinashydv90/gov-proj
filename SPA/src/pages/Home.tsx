import Layout from "../components/Layout";
import Gallery from "../components/Gallery";
import CarouselWithTopbar from "../components/CarouselWithTopbar";

const Home = () => {
  return (
    <>
      <CarouselWithTopbar />
      <Layout />
      <Gallery />
    </>
  );
};

export default Home;
