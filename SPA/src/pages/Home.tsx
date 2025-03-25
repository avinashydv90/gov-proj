import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

const Home = () => (
  <Carousel fade>
    <Carousel.Item>
      <Image
        src="../public/images/NewArticle.png"
        alt="Serene Waterfall"
        className="d-block w-100"
      />
      <Carousel.Caption>
        <h3>Serene Waterfall</h3>
        <p>Experience the beauty and calmness of nature.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <Image
        src="../public/images/NewsArticle2.png"
        alt="City Skyline"
        className="d-block w-100"
      />
      <Carousel.Caption>
        <h3>City Skyline</h3>
        <p>A breathtaking view of the city lights at night.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <Image
        src="../public/images/NewsArticle3.png"
        alt="Snowy Mountains"
        className="d-block w-100"
      />
      <Carousel.Caption>
        <h3>Snowy Mountains</h3>
        <p>Witness the majestic beauty of snow-covered peaks.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default Home;
