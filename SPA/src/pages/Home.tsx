import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import HomeDetail from "../components/HomeDetail";
import React from "react";

const Home = () => {
  const stylea: React.CSSProperties = {
    height: "40vh",
  };
  return (
    <>
      <Carousel fade>
        <Carousel.Item interval={500} style={stylea}>
          <Image
            src="../public/images/hero-carousel-1.jpg"
            className="d-block w-100 carousel-image"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500} style={stylea}>
          <Image
            src="../public/images/hero-carousel-2.jpg"
            // alt="City Skyline"
            className="d-block w-100 carousel-image"
          />
          <Carousel.Caption>
            <h3>City Skyline</h3>
            <p>A breathtaking view of the city lights at night.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500} style={stylea}>
          <Image
            src="../public/images/hero-carousel-3.jpg"
            className="d-block w-100 carousel-image"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <HomeDetail />
    </>
  );
};

export default Home;
