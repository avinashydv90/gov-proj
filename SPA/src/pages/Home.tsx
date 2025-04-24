import Layout from "../components/Layout";
import CarouselWithTopbar from "../components/CarouselWithTopbar";
import HelmetComponent from "../shared-components/HelemetComponent";

const Home = () => {
  return (
    <>
      <HelmetComponent
        title="Home | Adivasi Vikas Prakalp Shahapur"
        description="Home page of Adivasi Vikas Prakalp Shahapur"
        canonical="https://poitdp.shahapur-mh.in/"
      />
      <CarouselWithTopbar />
      <Layout />
    </>
  );
};

export default Home;
