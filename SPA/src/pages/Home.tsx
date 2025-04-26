import Layout from "../components/Layout";
import CarouselWithTopbar from "../components/CarouselWithTopbar";
import HelmetComponent from "../shared-components/HelemetComponent";

const Home = () => {
  return (
    <>
      <HelmetComponent
        title=" Adivasi Vikas Prakalp Shahapur| Official Website  | Adivasi Vikas Shahapur"
        description="Welcome to the official website of Adivasi Vikas Prakalp Shahapur. Explore various tribal development programs, schemes, and services."
        canonical="https://poitdp.shahapur-mh.in/"
      />
      <CarouselWithTopbar />
      <Layout />
    </>
  );
};

export default Home;
