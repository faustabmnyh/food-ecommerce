import { data } from "../../data";
import "./Home.css";
import Product from "../../components/Product";
import Jumbotron from "../../components/Jumbotron";

const Home = () => {
  return (
    <div className="home">
      <Jumbotron />
      <div className="home__product">
        {data.products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
